interface IUserPersistence {
  registerUser(entity: any): Promise<any>
  findUserByCPF(cpf: string): Promise<any>
  findAllCPF(): Promise<any>
  removeCPF(cpf: string): void
}

export { IUserPersistence }
