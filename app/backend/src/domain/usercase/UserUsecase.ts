import { HTTPError } from "../../infrastructure/utils/HTTPError";
import { User } from "../entities/User";
import { UserRepository } from "../repository/UserRepository";

class UserUseCase {
  constructor(private userRepository: UserRepository) { }

  public registerUser = async (entity: Pick<User, "cpf">): Promise<User> => {
    const userExists = await this.findUserByCPF(entity.cpf as unknown as string)
    if (userExists)
      throw new HTTPError(400, 'ExistsCpfException', 'CPF already exists');
      
    const isValidCpf = await this.isValidCPF(entity.cpf);
    if (!isValidCpf)
      throw new HTTPError(404, 'InvalidCpfException', 'CPF is not valid');


    if (entity.cpf.length !== 11)
      throw new HTTPError(400, 'InvalidCpfException', 'CPF is not valid');

    return await this.userRepository.registerUser(entity);
  }

  public findUserByCPF = async (cpf: string): Promise<string| null> => {
    const isValidCpf = await this.isValidCPF(cpf);
    if (!isValidCpf)
      throw new HTTPError(404, 'InvalidCpfException', 'CPF is not valid');

    const result = await this.userRepository.findUserByCPF(cpf);

    return result;
  }

  public findAllCPF = async (): Promise<User[]> => {
    return await this.userRepository.findAllCPF();
  }

  public removeCPF = async (cpf: string) => {
    const userExists = await this.findUserByCPF(cpf);

    if (!userExists)
      throw new HTTPError(400, 'NotFoundCpfException', 'CPF not found');

    const isValidCpf = await this.isValidCPF(cpf);
    if (!isValidCpf)
      throw new HTTPError(404, 'InvalidCpfException', 'CPF is not valid');

    return await this.userRepository.removeCPF(cpf);
  }

  public isValidCPF = async (cpf: any) => {
    if (typeof cpf !== 'string') return false
    cpf = cpf.replace(/[^\d]+/g, '')
    if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false
    cpf = cpf.split('')
    const validator = cpf
      .filter((digit: any, index: any, array: any) => index >= array.length - 2 && digit)
      .map((el: any) => +el)
    const toValidate = (pop: any) => cpf
      .filter((digit: any, index: any, array: any) => index < array.length - pop && digit)
      .map((el: any) => +el)
    const rest = (count: any, pop: any) => (toValidate(pop)
      .reduce((soma: any, el: any, i: any) => soma + el * (count - i), 0) * 10) % 11 % 10
    return !(rest(10, 2) !== validator[0] || rest(11, 1) !== validator[1])
  }
}

export { UserUseCase };
