import Order from '@/db/models/order/model';
import { AnaliticsData } from '@/types/services/admin/analiticsData';

class AdminService {
  async getAnaliticsData() {
    const orders = Order.find();
    const analiticsData: Array<AnaliticsData> = await orders.select('_id date isPaid nameField paymentType totalCost coupon');

    return analiticsData;
  }
}

export default new AdminService();
