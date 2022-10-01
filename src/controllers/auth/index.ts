import { Request, Response, NextFunction } from 'express';
import LoginCredentials from '@/types/routes/auth/loginCredentials';
import Roles from '@/constants/db/models/user/roles';
import AuthService from '@/services/auth';
import CookiesStorageKeys from '@/constants/controllers/auth/cookiesStorageKeys';
import { thirtyDaysInMilliseconds } from '@/constants/controllers/auth/timeDescriptionInMilliseconds';
import { CLIENT_PORT, CLIENT_URL } from '@/env';

class AuthController {
  async registration(req: Request, res: Response, next: NextFunction) {
    const { data } = req.body as { data: LoginCredentials };
    const { login, password } = data;

    try {
      const userData = await AuthService.registration(login, password, Roles.USER);

      res.cookie(CookiesStorageKeys.REFRESH_TOKEN, userData.refreshToken, {
        maxAge: thirtyDaysInMilliseconds,
        httpOnly: true,
      });
      return res.status(200).json(userData);
    } catch (error) {
      return res.status(500).json({ error: 'Server error [regitation]' });
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    const { data } = req.body as { data: LoginCredentials };
    const { login, password } = data;

    try {
      const { accesToken, refreshToken } = await AuthService.login(login, password);
      res.cookie(CookiesStorageKeys.REFRESH_TOKEN, refreshToken, {
        httpOnly: true,
      });
      return res.status(200).json({ accesToken, refreshToken });
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

  async activation(req: Request, res: Response, next: NextFunction) {
    try {
      // link is dinamic param in route URL
      const activationLink = req.params.link;

      await AuthService.activate(activationLink);

      return res.redirect(`${CLIENT_URL}:${CLIENT_PORT}`);
    } catch (error) {
      return res.status(500).json({ error: 'Server error [activation]' });
    }
  }
}

export default new AuthController();
