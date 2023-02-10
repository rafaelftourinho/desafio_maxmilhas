class HTTPError extends Error {
  public type: string;
  public message: string;

  constructor(type: string, message: string) {
    super(message);
    this.type = type;
    this.message = message;
  }
}

export { HTTPError };
