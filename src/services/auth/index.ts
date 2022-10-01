import Roles from '@/constants/db/models/user/roles';
import User from '@/db/models/user/model';
import bcrypt from 'bcrypt';
import TokenService from '@/services/token';
import UserDTO from '@/dataTransferClasses/services/auth/userDTO';
import { v4 } from 'uuid';
import MailService from '@/services/mail';
import { API_URL, PORT } from '@/env';
import { Routes } from '@/constants/routes';
import APIError from '@/exceptions/apiError';
import JWTPayload from '@/types/services/token/jwtPayload';

class AuthService {
  async registration(login: string, password: string, role: Roles) {
    const existingUser = await User.findOne({ login });

    if (existingUser) {
      throw APIError.BadRequest(`User with login: ${login} already exist`);
    }

    const hashedPassword = await bcrypt.hash(password, 7);
    const activationLink = v4();

    const userCandidate = new User({
      login,
      password: hashedPassword,
      role,
      isActivated: role === Roles.ADMIN,
      activationLink,
    });

    await userCandidate.save();

    if (role !== Roles.ADMIN) {
      const _activationLink = `${API_URL}:${PORT}${Routes.AUTH}${Routes.ACTIVATION}/${activationLink}`;
      await MailService.sendActivationEmail(login, _activationLink);
    }

    const tokens = await TokenService.generateTokens(userCandidate);
    await TokenService.saveToken(userCandidate._id, tokens.refreshToken);
    const userDTO = new UserDTO(userCandidate);

    return { ...tokens, userDTO };
  }

  async activate(activationLink) {
    const user = await User.findOne({ activationLink });

    if (!user) {
      throw APIError.BadRequest('Incorrect activation link');
    }

    user.isActivated = true;

    await user.save();
  }

  async login(login: string, password: string) {
    const user = await User.findOne({ login });

    if (!user) {
      throw APIError.BadRequest(`User with login: ${login} does not exist`);
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      throw APIError.BadRequest(`Incorrect password`);
    }

    const tokens = await TokenService.generateTokens(user);
    await TokenService.saveToken(user._id, tokens.refreshToken);

    const userDTO = new UserDTO(user);

    return { ...tokens, userDTO };
  }

  async logout(refreshToken: string) {
    const token = await TokenService.removeToken(refreshToken);

    return token;
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw APIError.UnauthorizedError();
    }

    const userDecodedData = (await TokenService.validateRefreshToken(refreshToken)) as JWTPayload;
    const tokenFromDB = await TokenService.findToken(refreshToken);

    if (!userDecodedData || !tokenFromDB) {
      throw APIError.UnauthorizedError();
    }

    const user = await User.findById(userDecodedData.id);

    const tokens = await TokenService.generateTokens(user);
    await TokenService.saveToken(user._id, tokens.refreshToken);

    const userDTO = new UserDTO(user);

    return { ...tokens, userDTO };
  }
}

export default new AuthService();
