import { Schema, Types } from 'mongoose';
import RefreshTokenInterface from './interface';
import { ModelNames } from '@/constants/db/models/index';

const RefreshTokenSchema = new Schema<RefreshTokenInterface>({
  user: { type: Types.ObjectId, ref: ModelNames.USER },
  refreshToken: { type: String, required: true },
});

export default RefreshTokenSchema;
