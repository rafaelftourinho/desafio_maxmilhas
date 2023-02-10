class HTTPError extends Error {
  public type: string;
  public message: string;
  public status: number

  constructor(status: number, type: string, message: string) {
    super(message);
    this.type = type;
    this.message = message;
    this.status = status;
  }
}

export { HTTPError };
