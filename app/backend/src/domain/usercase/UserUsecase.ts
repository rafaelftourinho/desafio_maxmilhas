import { HTTPError } from "../../infrastructure/utils/HTTPError";
import { User } from "../entities/User";
import { UserRepository } from "../repository/UserRepository";

const cpfCheck = /^(?:(\d)\1{10})$|(\D)|^(\d{12,})$|^(\d{0,10})$/g

class UserUseCase {
  constructor(private userRepository: UserRepository) {}

  public registerUser = async (entity: Pick<User, "cpf">): Promise<User> => {
    const userExists = await this.findUserByCPF(entity as Omit<User, "id">)
    if (userExists) {
      throw new HTTPError(400, 'ExistsCpfException', 'CPF already exists');
    }

    if (cpfCheck.test(entity.cpf)) {
      throw new HTTPError(400, 'InvalidCpfException', 'CPF is not valid1');
    }

    if (await this.isValidCPF(entity.cpf)) {
      throw new HTTPError(404, 'InvalidCpfException', 'CPF is not valid2');
    }

    if (entity.cpf.length !== 11) {
      throw new HTTPError(400, 'InvalidCpfException', 'CPF is not valid3');
    }

    return await this.userRepository.registerUser(entity);
  }

  public findUserByCPF = async (entity: Omit<User, "id">): Promise<Omit<User, 'id'> | null> => {
    const result = await this.userRepository.findUserByCPF(entity) as { id?: number, cpf: string, createdAt: string };

    // if (result) delete result.id;
    return result;
  }

  public findAllCPF = async (): Promise<User[]> => {
    return await this.userRepository.findAllCPF();
  }

  public removeCPF = async (cpf: string) => {
    const userExists = await this.findUserByCPF({ cpf, createdAt: '' });

    if (!userExists) {
      throw new HTTPError(404, 'NotFoundCpfException', 'CPF is not valid');
    }

    return await this.userRepository.removeCPF(cpf);
  }

  public isValidCPF = async (cpf: any)=> {
    if (typeof cpf !== 'string') return false
    cpf = cpf.replace(/[^\d]+/g, '')

    cpf = cpf.split('').map((el: string) => +el)
    const rest = (count: number) => (cpf.slice(0, count-12)
        .reduce( (soma: number, el: number, index: number) => (soma + el * (count-index)), 0 )*10) % 11 % 10
    return rest(10) === cpf[9] && rest(11) === cpf[10]
  }

  // public isValidCPF = async (cpf: any)=> {
  //   if (typeof cpf !== 'string') return false
  //   cpf.split('').every(number => number === cpf[number.length - 1])
  // }
}

export { UserUseCase };
