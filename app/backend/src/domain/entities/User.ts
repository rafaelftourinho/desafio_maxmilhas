class User {
  id: number;
  cpf: string;
  createdAt: Date;

  constructor() {
    this.id = 0;
    this.cpf = '';
    this.createdAt = new Date();
  }
}

export { User }
