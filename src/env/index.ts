import { config } from 'dotenv';
import { env } from 'process';

config();

export const { NODE_ENV, PORT, DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PWD, ADMIN_EMAIL, ADMIN_PWD, JWT_ACCES_SECRET_KEY } = env;
