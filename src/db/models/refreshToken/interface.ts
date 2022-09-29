import UserInterface from '@/db/models/user/interface';
import { ObjectId } from 'mongoose';

interface IRefreshToken {
  user: UserInterface | ObjectId;
  refreshToken: string;
}

export default IRefreshToken;
