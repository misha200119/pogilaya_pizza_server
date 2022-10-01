import { ValidationError } from 'express-validator';

export default class APIError extends Error {
  status: number;
  errors: Array<ValidationError>;

  constructor(status: number, message: string, errors?: Array<ValidationError>) {
    super(message);
    this.status = status;
    this.errors = errors ?? [];
  }

  static UnauthorizedError() {
    return new APIError(401, 'User unathorized');
  }

  static BadRequest(message: string, errors?: Array<ValidationError>) {
    return new APIError(400, message, errors);
  }

  static unexpectedServerError(message: string) {
    return new APIError(500, `Unexpected server error on[${message}]`);
  }
}
