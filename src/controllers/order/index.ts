import NewOrder from '@/types/routes/order/newOrder';
import { NextFunction, Request, Response } from 'express';
import OrderService from '@/services/order';

class OrderController {
  async createNewOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const { data } = req.body as { data: NewOrder };

      await OrderService.createOrder(data);

      return res.status(200).send('Ok');
    } catch (error) {
      next(error);
    }
  }
}

export default new OrderController();
