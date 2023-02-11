import { UserPersistence } from '../../src/infrastructure/persistence/UserPersistence';
import db from '../../src/infrastructure/utils/Connection';

describe('UserPersistence', () => {
  let userPersistence: UserPersistence;

  beforeEach(() => {
    userPersistence = new UserPersistence();
  });

  afterEach(async () => {
    await db.execute('DELETE FROM user');
  });

  it('should register a new user', async () => {
    const user = { cpf: '12345678901' };

    const registeredUser = await userPersistence.registerUser(user);

    expect(registeredUser).toEqual(user);
  });

  it('should find a user by CPF', async () => {
    const user = { cpf: '12345678901', createdAt: expect.any(Date) };
    await userPersistence.registerUser(user);

    const foundUser = await userPersistence.findUserByCPF(user as any);

    expect(foundUser).toEqual({ ...user, id: expect.any(Number) });
  });

  it('should return null if user is not found by CPF', async () => {
    const user = { cpf: '12345678901' };

    const foundUser = await userPersistence.findUserByCPF(user as any);

    expect(foundUser).toBeNull();
  });

  it('should return all registered users', async () => {
    const user1 = { cpf: '12345678901' };
    const user2 = { cpf: '10987654321' };
    await userPersistence.registerUser(user1);
    await userPersistence.registerUser(user2);

    const users = await userPersistence.findAllCPF();

    expect(users).toEqual([
      { ...user1, id: expect.any(Number), createdAt: expect.any(Date) },
      { ...user2, id: expect.any(Number), createdAt: expect.any(Date) },
    ]);
  });

  it('should remove a user by CPF', async () => {
    const user = { cpf: '12345678901' };
    await userPersistence.registerUser(user);

    await userPersistence.removeCPF(user.cpf);

    const foundUser = await userPersistence.findUserByCPF(user as any);

    expect(foundUser).toBeNull();
  });
});
