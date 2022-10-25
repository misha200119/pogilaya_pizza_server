import NewOrder from '@/types/routes/order/newOrder';
import Order from '@/db/models/order/model';
import APIError from '@/exceptions/apiError';
import IOrder from '@/db/models/order/interface';

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

  async deleteOrder(id: string) {
    try {
      await Order.deleteOne({ _id: id });
    } catch (error) {
      throw APIError.BadRequest('deleteOrder');
    }
  }

  async patchOrder(_id: string, fields: Partial<IOrder>) {
    try {
      const order = await Order.findOne({ _id });

      if (!order) {
        throw APIError.BadRequest('patchOrder');
      }

      const keys = Object.keys(fields) as Array<keyof Partial<IOrder>>;

      for (const key of keys) {
        order[key] = fields[key] as never;
      }

      await order.save();
    } catch (error) {
      throw APIError.UnexpectedServerError('patchOrder');
    }
  }
}

export default new OrderService();
