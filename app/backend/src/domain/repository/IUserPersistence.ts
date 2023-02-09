interface IUserPersistence {
  registerUser(entity: any): Promise<any>
  findUserByCPF(entity: any): Promise<any>
  findAllCPF(): Promise<any>
  removeCPF(cpf: string): void
}

export { IUserPersistence }
