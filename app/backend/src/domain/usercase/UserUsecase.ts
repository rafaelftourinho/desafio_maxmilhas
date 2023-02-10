import { User } from "../entities/User";
import { UserRepository } from "../repository/UserRepository";

// const cpfCheck =/^([0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}|[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2})$/;
// const cpfCheck1 = /^([0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2})$/;
const cpfCheck = /^(?:(\d)\1{10})$|(\D)|^(\d{12,})$|^(\d{0,10})$/g
// const test = { type: "invalidCpfException", "message": "Invalid CPF"}

class UserUseCase {
  constructor(private userRepository: UserRepository) {}

  public registerUser = async (entity: Pick<User, "cpf">): Promise<User> => {

    console.log()
    if (!this.isValidCPF(entity.cpf)) {
      throw new Error('CPF is not valid');
    }

    if (cpfCheck.test(entity.cpf)) {
      throw new Error('CPF is not valid');
    }
    
    if (entity.cpf.length !== 11) {
      throw new Error('CPF is not valid');
    }

    return await this.userRepository.registerUser(entity);
  }

  public findUserByCPF = async (entity: Pick<User, "cpf">): Promise<User> => {

    if (!this.isValidCPF(entity.cpf)) {
      throw new Error('CPF is not valid');
    }

    if (cpfCheck.test(entity.cpf)) {
      throw new Error('CPF is not valid');
    }

    return await this.userRepository.findUserByCPF(entity);
  }

  public findAllCPF = async (): Promise<User[]> => {
    return await this.userRepository.findAllCPF();
  }

  public removeCPF = async (cpf: string) => {

    if (!this.isValidCPF(cpf)) {
      throw new Error('CPF is not valid');
    }

    if (cpfCheck.test(cpf)) {
      throw new Error('CPF is not valid');
    }

    return await this.userRepository.removeCPF(cpf);
  }

  public isValidCPF = async (cpf: any)=> {
    if (typeof cpf !== 'string') return false
    cpf = cpf.replace(/[^\d]+/g, '')

    if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false

    cpf = cpf.split('').map((el: string) => +el)
    const rest = (count: number) => (cpf.slice(0, count-12)
        .reduce( (soma: number, el: number, index: number) => (soma + el * (count-index)), 0 )*10) % 11 % 10
    return rest(10) === cpf[9] && rest(11) === cpf[10]
  }
}

export { UserUseCase };
