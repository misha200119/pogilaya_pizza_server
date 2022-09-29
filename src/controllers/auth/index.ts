import { Request, Response, NextFunction } from 'express';
import LoginCredentials from '@/types/routes/auth/loginCredentials';
import User from '@/db/models/user/model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_ACCES_SECRET_KEY } from '@/env';
import Roles from '@/constants/db/models/user/roles';
import AuthService from '@/services/auth';

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
    try {
      const { data } = req.body as { data: LoginCredentials };
      const { login, password } = data;
      const user = await User.findOne({ login });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      const isPWDValid = bcrypt.compareSync(password, user.password);
      if (!isPWDValid) {
        return res.status(400).json({ error: 'Invalid password' });
      }
      const isAdmin = user.role === Roles.ADMIN;
      const accesToken = jwt.sign({ id: user._id, isAdmin }, JWT_ACCES_SECRET_KEY, { expiresIn: '1h' });
      const refreshToken = jwt.sign({ id: user._id, isAdmin }, JWT_ACCES_SECRET_KEY, { expiresIn: '30d' });

      // const refreshTokenDocument = new RefreshToken();
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
