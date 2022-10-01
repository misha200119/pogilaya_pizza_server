import { body } from 'express-validator';

export default body('data.password').isLength({ min: 8 });
