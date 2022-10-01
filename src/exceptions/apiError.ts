export default class APIError extends Error {
  status: number;
  errors: Array<any>;

  constructor(status: number, message: string, errors?: Array<any>) {
    super(message);
    this.status = status;
    this.errors = errors ?? [];
  }

  static UnauthorizedError() {
    return new APIError(401, 'User unathorized');
  }

  static BadRequest(message: string, errors: Array<any>) {
    return new APIError(400, message, errors);
  }
}
