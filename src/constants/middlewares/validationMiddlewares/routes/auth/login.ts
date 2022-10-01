import { body } from 'express-validator';

export default body('data.login').isEmail();
