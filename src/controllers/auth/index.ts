import { Request, Response, NextFunction } from 'express';
import LoginCredentials from '@/types/routes/auth/loginCredentials';
import Roles from '@/constants/db/models/user/roles';
import AuthService from '@/services/auth';
import CookiesStorageKeys from '@/constants/controllers/auth/cookiesStorageKeys';
import { thirtyDaysInMilliseconds } from '@/constants/controllers/auth/timeDescriptionInMilliseconds';
import { CLIENT_PORT, CLIENT_URL } from '@/env';
import { validationResult } from 'express-validator/src/validation-result';
import APIError from '@/exceptions/apiError';

class AuthController {
  async registration(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return next(APIError.BadRequest('Registration validation error', errors.array()));
      }
      const { data } = req.body as { data: LoginCredentials };
      const { login, password } = data;
      const userData = await AuthService.registration(login, password, Roles.USER);

      res.cookie(CookiesStorageKeys.REFRESH_TOKEN, userData.refreshToken, {
        maxAge: thirtyDaysInMilliseconds,
        httpOnly: true,
      });
      return res.status(200).json(userData);
    } catch (error) {
      next(error);
    }
  }

  async activation(req: Request, res: Response, next: NextFunction) {
    try {
      // link is dinamic param in route URL
      const activationLink = req.params.link;

      await AuthService.activate(activationLink);

      return res.redirect(`${CLIENT_URL}:${CLIENT_PORT}`);
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return next(APIError.BadRequest('Login validation error', errors.array()));
      }

      const { data } = req.body as { data: LoginCredentials };
      const { login, password } = data;
      const userData = await AuthService.login(login, password);

      res.cookie(CookiesStorageKeys.REFRESH_TOKEN, userData.refreshToken, {
        maxAge: thirtyDaysInMilliseconds,
        httpOnly: true,
      });
      return res.status(200).json(userData);
    } catch (error) {
      next(error);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;

      await AuthService.logout(refreshToken);
      res.clearCookie(CookiesStorageKeys.REFRESH_TOKEN);

      return res.status(200).json('ok');
    } catch (error) {
      next(error);
    }
  }

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;

      const userData = await AuthService.refresh(refreshToken);

      res.cookie(CookiesStorageKeys.REFRESH_TOKEN, userData.refreshToken, {
        maxAge: thirtyDaysInMilliseconds,
        httpOnly: true,
      });
      res.status(200).json(userData);
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();
