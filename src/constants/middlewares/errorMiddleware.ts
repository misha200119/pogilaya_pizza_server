import APIError from '@/exceptions/apiError';
import { Request, Response, NextFunction } from 'express';

const errorMiddleware = (error: APIError | Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof APIError) {
    return res.status(error.status).json({ message: error.message, errors: error.errors });
  }

  return res.status(500).json({ message: 'Unexpected server error' });
};

export default errorMiddleware;
