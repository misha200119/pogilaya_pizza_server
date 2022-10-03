import { Response, Request, NextFunction } from 'express';
import APIError from '@/exceptions/apiError';
import JWTPayload from '@/types/services/token/jwtPayload';

const adminOnlyMiddleware = async (req: Request & { userData: JWTPayload }, response: Response, next: NextFunction) => {
  try {
    const { userData } = req;

    console.log('admin only middleware');

    next(req);
  } catch (error) {
    return next(APIError.NotAminError());
  }
};

export default adminOnlyMiddleware;
