import { User } from "../entities/User";
import { UserRepository } from "../repository/UserRepository";

const cpfCheck =/^([0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}|[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2})$/;
const cpfCheck1 = /^([0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2})$/;
const cpfCheck2 = /^(?:(\d)\1{10})$|(\D)|^(\d{12,})$|^(\d{0,10})$/g
// const test = { type: "invalidCpfException", "message": "Invalid CPF"}

class UserUseCase {
  constructor(private userRepository: UserRepository) {}

  public registerUser = async (entity: Pick<User, "cpf">): Promise<User> => {

    if (!cpfCheck2.test(entity.cpf)) {
      throw new Error('CPF is not valid');
    }

    return await this.userRepository.registerUser(entity);
  }

  public findUserByCPF = async (entity: Omit<User, "id">): Promise<User> => {

    if (!cpfCheck2.test(entity.cpf)) {
      throw new Error('CPF is not valid');
    }

    return await this.userRepository.findUserByCPF(entity);
  }

  public findAllCPF = async (): Promise<User[]> => {
    return await this.userRepository.findAllCPF();
  }

  public removeCPF = async (cpf: string): Promise<User> => {

    if (!cpfCheck2.test(cpf)) {
      throw new Error('CPF is not valid');
    }

    return await this.userRepository.removeCPF(cpf);
  }
}

export { UserUseCase };
