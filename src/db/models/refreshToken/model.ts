import { ModelNames } from '@/constants/db/models';
import { model } from 'mongoose';
import RefreshTokenInterface from './interface';
import RefreshTokenSchema from './schema';

const RefreshToken = model<RefreshTokenInterface>(ModelNames.REFRESH_TOKEN, RefreshTokenSchema);

export default RefreshToken;
