import '../helper/dbMock';
import { UserPersistence } from '../../src/infrastructure/persistence/UserPersistence';
import db from '../../src/infrastructure/database/Connection';

describe('UserPersistence', () => {
  let userPersistence: UserPersistence;

  beforeEach(() => {
    userPersistence = new UserPersistence();
  });

  it('should register a new user', async () => {
    const user = { cpf: '12345678901' };

    const registeredUser = await userPersistence.registerUser(user);

    expect(db.execute).toBeCalledWith('INSERT INTO user (cpf) VALUES (?)', [user.cpf]);
    expect(registeredUser).toEqual(user);
  });

  it('should find a user by CPF', async () => {
    (db.execute as jest.Mock).mockImplementationOnce(() => Promise.resolve([[ 'string qualquer']]));
    const user ='string qualquer';

    const foundUser = await userPersistence.findUserByCPF(user as any);

    expect(db.execute).toBeCalledWith('SELECT * FROM user WHERE cpf = ?', [user]);
    expect(foundUser).toEqual(user);
  });

  it('should return null if user is not found by CPF', async () => {
    (db.execute as jest.Mock).mockImplementationOnce(() => Promise.resolve([[]]));
    const user = '12345678901';

    const foundUser = await userPersistence.findUserByCPF(user as any);
    expect(db.execute).toBeCalledWith('SELECT * FROM user WHERE cpf = ?', [user]);
    expect(foundUser).toBeNull();
  });

  it('should return all registered users', async () => {
    (db.execute as jest.Mock).mockImplementationOnce(() => Promise.resolve([[
      'valor1', 'valor2'
    ]]));
    const users = await userPersistence.findAllCPF();

    expect(db.execute).toBeCalledWith('SELECT * FROM user');
    expect(users).toEqual(['valor1', 'valor2']);
  });

  it('should remove a user by CPF', async () => {
    const cpf ='string qualquer';

    await userPersistence.removeCPF(cpf);

    expect(db.execute).toBeCalledWith('DELETE FROM user WHERE cpf = ?', [cpf]);
  });
});
