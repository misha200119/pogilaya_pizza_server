import UserInteface from '@/db/models/user/interface';
import jwt from 'jsonwebtoken';
import { JWT_ACCES_SECRET_KEY } from '@/env';
import Roles from '@/constants/db/models/user/roles';
import RefreshToken from '@/db/models/refreshToken/model';
import { ObjectId } from 'mongoose';

class TokenService {
  async generateTokens(user: UserInteface) {
    const isAdmin = user.role === Roles.ADMIN;
    const accesToken = jwt.sign({ id: user._id, isAdmin, isActivated: user.isActivated }, JWT_ACCES_SECRET_KEY, { expiresIn: '1h' });
    const refreshToken = jwt.sign({ id: user._id, isAdmin, isActivated: user.isActivated }, JWT_ACCES_SECRET_KEY, { expiresIn: '30d' });

    return { accesToken, refreshToken };
  }

  async saveToken(userId: ObjectId, refreshToken: string) {
    const existToken = await RefreshToken.findOne({ user: userId });

    if (existToken) {
      existToken.refreshToken = refreshToken;
      existToken.save();

      return;
    }

    const refreshTokenDocument = new RefreshToken({ user: userId, refreshToken });

    await refreshTokenDocument.save();

    return refreshTokenDocument;
  }

  async removeToken(refreshToken: string) {
    const tokenDocument = await RefreshToken.deleteOne({ refreshToken });

    return tokenDocument;
  }

  async findToken(refreshToken: string) {
    const tokenDocument = await RefreshToken.findOne({ refreshToken });

    return tokenDocument;
  }

  async validateAccesToken(accesToken: string) {
    try {
      const userData = jwt.verify(accesToken, JWT_ACCES_SECRET_KEY);

      return userData;
    } catch (error) {
      return null;
    }
  }

  async validateRefreshToken(refreshToken: string) {
    try {
      const userData = jwt.verify(refreshToken, JWT_ACCES_SECRET_KEY);
      return userData;
    } catch (error) {
      return null;
    }
  }
}

export default new TokenService();
