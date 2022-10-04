import { body } from 'express-validator';

export default body('auth.login').isEmail();
