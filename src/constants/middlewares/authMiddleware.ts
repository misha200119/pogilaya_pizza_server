import { Response, Request, NextFunction } from 'express';
import APIError from '@/exceptions/apiError';
import TokenServie from '@/services/token';
import JWTPayload from '@/types/services/token/jwtPayload';

const authMiddleware = async (req: Request & { userData: JWTPayload }, response: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return next(APIError.UnauthorizedError());
    }

    const accesToken = authHeader.split(' ')[1];

    if (!accesToken) {
      return next(APIError.UnauthorizedError());
    }

    const userData = (await TokenServie.validateAccesToken(accesToken)) as JWTPayload;

    if (!userData) {
      return next(APIError.UnauthorizedError());
    }

    req.userData = userData;

    next(req);
  } catch (error) {
    return next(APIError.UnauthorizedError());
  }
};

export default authMiddleware;
