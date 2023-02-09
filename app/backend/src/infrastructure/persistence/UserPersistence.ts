import { ResultSetHeader } from 'mysql2';
import { User } from '../../domain/entities/User';
import { IUserPersistence } from '../../domain/repository/IUserPersistence';
import db from '../utils/Connection';

class UserPersistence implements IUserPersistence {
  public registerUser = async (entity: Pick<User, 'cpf'>) => {
    const query = 'INSERT INTO users (cpf) VALUES (?)';

    const values = [entity.cpf];
    await db.execute<ResultSetHeader>(query, values);
    const newUser: Pick<User, 'cpf'> = { cpf: entity.cpf };
    return newUser
  }

  public findUserByCPF = async (entity: Pick<User, 'cpf'>): Promise<User> => {
    const query = 'SELECT * FROM users WHERE cpf = ?';
    const values = [entity.cpf];

    const [data] = await db.execute(query, values);
    const [user] = data as User[];

    return user || null;
  }

  public findAllCPF = async (): Promise<User[]> => {
    const query = 'SELECT * FROM users';

    const [data] = await db.execute(query);
    const users = data as User[];

    return users;
  }

  public removeCPF = async (cpf: string) => {
    const query = 'DELETE FROM users WHERE cpf = ?';
    const values = [cpf];
    await db.execute<ResultSetHeader>(query, values);
  }
}

export { UserPersistence };
