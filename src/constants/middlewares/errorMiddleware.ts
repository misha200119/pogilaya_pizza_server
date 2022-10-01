import APIError from '@/exceptions/apiError';
import { Request, Response, NextFunction } from 'express';

const errorMiddleware = (error, req: Request, res: Response, next: NextFunction) => {
  console.error(error);

  if (error instanceof APIError) {
    return res.status(error.status).json({ message: error.message, errors: error.errors });
  }

  return res.status(500).json({ message: 'Unexpected server errror' });
};

export default errorMiddleware;
