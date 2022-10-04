import { body } from 'express-validator';

export default body('auth.password').isLength({ min: 8 }).isString();
