import { HTTPError } from "../../infrastructure/utils/HTTPError";
import { User } from "../entities/User";
import { UserRepository } from "../repository/UserRepository";

const cpfCheck = /^(?:(\d)\1{10})$|(\D)|^(\d{12,})$|^(\d{0,10})$/g

class UserUseCase {
  constructor(private userRepository: UserRepository) {}

  public registerUser = async (entity: Pick<User, "cpf">): Promise<User> => {
    if (!this.isValidCPF(entity.cpf)) {
      throw new HTTPError(404, 'InvalidCpfException', 'CPF is not valid');
    }

    if (cpfCheck.test(entity.cpf)) {
      throw new HTTPError(400, 'InvalidCpfException', 'CPF is not valid');
    }
    
    if (entity.cpf.length !== 11) {
      throw new HTTPError(400, 'InvalidCpfException', 'CPF is not valid');
    }

    if (await this.findUserByCPF(entity as unknown as Omit<User, "id">)) {
      throw new HTTPError(400, 'ExistsCpfException', 'CPF already exists');
    }

    return await this.userRepository.registerUser(entity);
  }

  public findUserByCPF = async (entity: Omit<User, "id">): Promise<Omit<User, 'id'> | null> => {
    const result = await this.userRepository.findUserByCPF(entity);

    if(!result) return null;
    return { cpf: result.cpf, createdAt: result.createdAt };
  }

  public findAllCPF = async (): Promise<User[]> => {
    return await this.userRepository.findAllCPF();
  }

  public removeCPF = async (cpf: string) => {

    if (this.findUserByCPF({ cpf, createdAt: new Date().toLocaleString() }) === null) {
      throw new HTTPError(400, 'ExistsCpfException', 'CPF already exists');
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
  //   cpf.split('').every(number => number === cpf[0])
  // }
}

export { UserUseCase };
