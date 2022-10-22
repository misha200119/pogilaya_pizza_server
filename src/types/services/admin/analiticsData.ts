import IOrder from '@/db/models/order/interface';

export type AnaliticsData = Pick<IOrder, '_id' | 'date' | 'isPaid' | 'nameField' | 'paymentType' | 'totalCost' | 'coupon'>;
