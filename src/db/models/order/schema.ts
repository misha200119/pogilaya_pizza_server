import { Schema, Types } from 'mongoose';
import OrderInterface from './interface';

const OrderSchema = new Schema<OrderInterface>({
  orderTime: { type: Number, required: true },
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true },
  street: { type: String, required: true },
  house: { type: String, required: true },
  flat: { type: String, required: true },
  entrance: { type: String, required: true },
  intercomCode: { type: String, required: true },
  floor: { type: Number, required: true },
  comment: { type: String, required: true },
  offCoupon: { type: String, required: true },
  paymantType: { type: String, required: true },
  totalCost: { type: Number, required: true },
  isPaid: { type: Boolean, required: true },
  orderCart: { type: Object, required: true },
});

export default OrderSchema;
