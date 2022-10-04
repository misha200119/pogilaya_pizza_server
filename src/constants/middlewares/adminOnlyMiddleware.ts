import { Response, Request, NextFunction } from 'express';
import APIError from '@/exceptions/apiError';
import JWTPayload from '@/types/services/token/jwtPayload';

const adminOnlyMiddleware = async (req: Request & { userData: JWTPayload }, response: Response, next: NextFunction) => {
  try {
    const { userData } = req;

    if (!userData.isAdmin) {
      return next(APIError.NotAdminError());
    }

    next();
  } catch (error) {
    return next(APIError.NotAdminError());
  }
};

export default adminOnlyMiddleware;
