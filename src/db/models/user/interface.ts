import Roles from '@/constants/db/models/user/roles';
import { ObjectId } from 'mongoose';

interface IUser {
  _id: ObjectId;
  login: string;
  password: string;
  role: Roles;
}

export default IUser;
