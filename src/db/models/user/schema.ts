import { Schema } from 'mongoose';
import UserInterface from './interface';

const UserSchema = new Schema<UserInterface>({
  login: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
});

export default UserSchema;
