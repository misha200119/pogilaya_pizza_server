import NewOrder from '@/types/routes/order/newOrder';
import Order from '@/db/models/order/model';
import APIError from '@/exceptions/apiError';

class OrderService {
  async createOrder(data: NewOrder) {
    try {
      const { orderDetails, cart } = data;

      const fields = { ...orderDetails, cart, isPaid: false };

      const newOrder = new Order(fields);

      await newOrder.save();
    } catch (error) {
      throw APIError.unexpectedServerError('createOrder');
    }
  }
}

export default new OrderService();
