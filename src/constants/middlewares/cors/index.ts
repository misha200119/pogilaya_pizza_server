import cors from 'cors';
import { CLIENT_URL, CLIENT_PORT } from '@/env';

export default cors({
  credentials: true,
  origin: `${CLIENT_URL}:${CLIENT_PORT}`,
});
