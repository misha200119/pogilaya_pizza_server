import { ModelNames } from '@/constants/db/models';
import { model } from 'mongoose';
import UserInteface from './interface';
import UserSchema from './schema';

const User = model<UserInteface>(ModelNames.USER, UserSchema);

export default User;
