import Roles from '@/constants/db/models/user/roles';
import { ObjectId } from 'mongoose';

interface IUser {
  _id: ObjectId;
  login: string;
  password: string;
  role: Roles;
  isActivated: boolean;
  activationLink: string;
}

export default IUser;
