import { User } from '../entities/User';
import { IUserPersistence } from './IUserPersistence';

class UserRepository {
  constructor(private iPersistence: IUserPersistence) {}

  public registerUser = async (entity: Pick<User, "cpf">): Promise<User> => {
    return await this.iPersistence.registerUser(entity);
  }

  public findUserByCPF = async (entity: Pick<User, 'cpf'>): Promise<User> => {
    return await this.iPersistence.findUserByCPF(entity);
  }

  public findAllCPF = async (): Promise<User[]> => {
    return await this.iPersistence.findAllCPF();
  }

  public removeCPF = async (cpf: string) => {
    return await this.iPersistence.removeCPF(cpf);
  }
}

export { UserRepository };
