import { body } from 'express-validator';

export default body('data.orderDetails', 'data.cart').isObject();
