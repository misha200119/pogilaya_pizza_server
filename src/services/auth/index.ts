import Roles from '@/constants/db/models/user/roles';
import User from '@/db/models/user/model';
import bcrypt from 'bcrypt';
import TokenService from '@/services/token';
import UserDTO from '@/dataTransferClasses/services/auth/userDTO';
import { v4 } from 'uuid';
import MailService from '@/services/mail';
import { API_URL, PORT } from '@/env';
import { Routes } from '@/constants/routes';

class AuthService {
  async registration(login: string, password: string, role: Roles) {
    const existingUser = await User.findOne({ login });

    if (existingUser) {
      throw new Error(`User with login: ${login} already exist`);
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
      throw new Error('Incorrect activation link');
    }

    user.isActivated = true;

    await user.save();
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

    // await refreshTokenDocument.save();

    // return { accesToken, refreshToken };
  }

  // async logout() {}
}

export default new AuthService();
