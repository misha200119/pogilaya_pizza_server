import Roles from '@/constants/db/models/user/roles';
import User from '@/db/models/user/model';
import { JWT_ACCES_SECRET_KEY } from '@/env';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import RefreshToken from '@/db/models/refreshToken/model';
import { resolve } from 'path';
import { Response } from 'express';

class AuthService {
  async registration(login: string, password: string, role: Roles) {
    const existingUser = await User.findOne({ login });

    if (existingUser) {
      throw new Error(`User with login: ${login} already exist`);
    }

    const hashedPassword = await bcrypt.hash(password, 7);

    const userCandidate = new User({
      login,
      password: hashedPassword,
      role,
    });

    await userCandidate.save();
  }

  async login(login: string, password: string) {
    const user = await User.findOne({ login });

    if (!user) {
      throw new Error(`User with login: ${login} does not exist`);
    }
    const isPasswordValid = bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error(`Incorrect password`);
    }

    const isAdmin = user.role === Roles.ADMIN;
    const accesToken = jwt.sign({ id: user._id, isAdmin }, JWT_ACCES_SECRET_KEY, { expiresIn: '1h' });
    const refreshToken = jwt.sign({ id: user._id, isAdmin }, JWT_ACCES_SECRET_KEY, { expiresIn: '30d' });

    const refreshTokenDocument = new RefreshToken({ user: user._id, refreshToken });

    await refreshTokenDocument.save();

    return { accesToken, refreshToken };
  }
}

export default new AuthService();
