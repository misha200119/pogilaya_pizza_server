import NewOrder from '@/types/routes/order/newOrder';
import { NextFunction, Request, Response } from 'express';
import OrderService from '@/services/order';
import { validationResult } from 'express-validator';
import APIError from '@/exceptions/apiError';

class OrderController {
  async createNewOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return next(APIError.BadRequest('Create new order validation error', errors.array()));
      }

      const { data } = req.body as { data: NewOrder };

      await OrderService.createOrder(data);

      return res.status(200).send('Ok');
    } catch (error) {
      next(error);
    }
  }

  async getOrders(req: Request, res: Response, next: NextFunction) {
    try {
      const orders = await OrderService.getOrders();

      return res.status(200).json(orders);
    } catch (error) {
      next(error);
    }
  }
}

export default new OrderController();
