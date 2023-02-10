import { HTTPError } from "../../infrastructure/utils/HTTPError";
import { User } from "../entities/User";
import { UserRepository } from "../repository/UserRepository";

class UserUseCase {
  constructor(private userRepository: UserRepository) {}

  public registerUser = async (entity: Pick<User, "cpf">): Promise<User> => {
    const userExists = await this.findUserByCPF(entity as Omit<User, "id">)
    if (userExists) {
      throw new HTTPError(400, 'ExistsCpfException', 'CPF already exists');
    }

    if (await this.isValidCPF(entity.cpf)) {
      throw new HTTPError(404, 'InvalidCpfException', 'CPF is not valid');
    }
    
    if (entity.cpf.length !== 11) {
      throw new HTTPError(400, 'InvalidCpfException', 'CPF is not valid');
    }

    return await this.userRepository.registerUser(entity);
  }

  public findUserByCPF = async (entity: Omit<User, "id">): Promise<Omit<User, 'id'> | null> => {
    const result = await this.userRepository.findUserByCPF(entity);

    return result;
  }

  public findAllCPF = async (): Promise<User[]> => {
    return await this.userRepository.findAllCPF();
  }

  public removeCPF = async (cpf: string) => {
    const userExists = await this.findUserByCPF({ cpf, createdAt: '' });

    if (!userExists) {
      throw new HTTPError(400, 'NotFoundCpfException', 'CPF not found');
    }

    return await this.userRepository.removeCPF(cpf);
  }

  public isValidCPF = async (cpf: any)=> {
    let soma;
    let resto;
    soma = 0;
  if (cpf == "00000000000") return false;

  for (let i=1; i<=9; i++) soma = soma + parseInt(cpf.substring(i-1, i)) * (11 - i);
  resto = (soma * 10) % 11;

    if ((resto == 10) || (resto == 11))  resto = 0;
    if (resto != parseInt(cpf.substring(9, 10)) ) return false;

  soma = 0;
    for (let i = 1; i <= 10; i++) soma = soma + parseInt(cpf.substring(i-1, i)) * (12 - i);
    resto = (soma * 10) % 11;

    if ((resto == 10) || (resto == 11))  resto = 0;
    if (resto != parseInt(cpf.substring(10, 11) ) ) return false;
    return true;
  }
}

export { UserUseCase };
