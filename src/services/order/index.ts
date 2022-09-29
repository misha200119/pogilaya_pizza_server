import NewOrder from '@/types/routes/order/newOrder';
import Order from '@/db/models/order/model';

class OrderService {
  async createOrder(data: NewOrder) {
    const { orderDetails, cart } = data;

    const document = { ...orderDetails, cart, isPaid: false };

    const newOrder = new Order(document);

    await newOrder.save();
  }
}

export default new OrderService();
