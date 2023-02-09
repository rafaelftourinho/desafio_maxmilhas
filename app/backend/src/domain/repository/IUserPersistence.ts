interface IUserPersistence {
  register(entity: any): Promise<any>
  findUserByCPF(cpf: string): Promise<any>
  findAllCPF(): Promise<any>
  removeCPF(cpf: string): Promise<any>
}

