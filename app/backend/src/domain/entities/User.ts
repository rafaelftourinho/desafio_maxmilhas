class User {
  id: number;
  cpf: string;
  created_at: Date;

  constructor() {
    this.id = 0;
    this.cpf = '';
    this.created_at = new Date();
  }
}

export { User }
