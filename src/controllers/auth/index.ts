import { Request, Response, NextFunction } from 'express';
import LoginCredentials from '@/types/routes/auth/loginCredentials';
import User from '@/db/models/user/model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_ACCES_SECRET_KEY } from '@/env';
import Roles from '@/constants/db/models/user/roles';
import AuthService from '@/services/auth';
import CookiesStorageKeys from '@/constants/controllers/auth/cookiesStorageKeys';

class AuthController {
  async registration(req: Request, res: Response, next: NextFunction) {
    const { data } = req.body as { data: LoginCredentials };
    const { login, password } = data;

    try {
      await AuthService.registration(login, password, Roles.USER);
      return res.status(200).json('Ok');
    } catch (e) {
      return res.status(500).json({ error: 'Server error' });
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    const { data } = req.body as { data: LoginCredentials };
    const { login, password } = data;

    try {
      const { accesToken, refreshToken } = await AuthService.login(login, password);
      res.cookie(CookiesStorageKeys.REFRESH_TOKEN, refreshToken, {
        secure: false,
        httpOnly: true,
      });
      return res.json({ accesToken, refreshToken });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      console.log('logout');
      return res.status(200).json('Ok');
    } catch (error) {
      return res.status(500).json({ error: 'Server error' });
    }
  }
}

export default new AuthController();
