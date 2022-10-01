import Roles from '@/constants/db/models/user/roles';
import { ObjectId } from 'mongoose';
import UserInterface from '@/db/models/user/interface';

export default class UserDTO {
  id: ObjectId;
  login: string;
  role: Roles;
  isActivated: boolean;

  constructor(user: UserInterface) {
    this.id = user._id;
    this.login = user.login;
    this.role = user.role;
    this.isActivated = user.isActivated;
  }
}
