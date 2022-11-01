import cors from 'cors';
import { CLIENT_URL, CLIENT_PORT, isProd } from '@/env';

export default cors({
  credentials: true,
  origin: isProd ? CLIENT_URL : `${CLIENT_URL}:${CLIENT_PORT}`,
});
