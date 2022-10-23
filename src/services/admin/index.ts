import Order from '@/db/models/order/model';
import { AnaliticsData } from '@/types/services/admin/analiticsData';
import moment from 'moment-timezone';

class AdminService {
  async getAnaliticsData() {
    const orders = Order.find();
    const analiticsData: Array<AnaliticsData> = await orders.select('_id date isPaid nameField paymentType totalCost coupon');

    const mapAnaliticsData = new Map<string, Array<AnaliticsData>>();

    analiticsData.forEach(order => {
      const date = moment(order.date);
      if (!date.isValid()) {
        return;
      }
      const currentDay = date.format('YYYY-MM-DD');

      if (!mapAnaliticsData.has(currentDay)) {
        mapAnaliticsData.set(currentDay, []);
      }
      mapAnaliticsData.get(currentDay).push(order);
    });

    return [...mapAnaliticsData].sort((d1, d2) => d1[0].localeCompare(d2[0]));
  }
}

export default new AdminService();
