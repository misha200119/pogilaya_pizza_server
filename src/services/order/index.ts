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
      throw APIError.UnexpectedServerError('createOrder');
    }
  }

  async getOrders() {
    try {
      const orders = await Order.find();

      return orders;
    } catch (error) {
      throw APIError.UnexpectedServerError('getOrders');
    }
  }
}

export default new OrderService();
