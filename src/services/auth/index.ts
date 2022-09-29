import Roles from '@/constants/db/models/user/roles';
import User from '@/db/models/user/model';
import bcrypt from 'bcrypt';

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
}

export default new AuthService();
