import { Schema } from 'mongoose';
import OrderInterface from './interface';

const OrderSchema = new Schema<OrderInterface>({
  selectedDeliveryType: String,
  nameField: String,
  phoneNumberField: String,
  email: String,
  street: String,
  house: String,
  flat: String,
  entrance: String,
  intercomCode: String,
  floor: String,
  comment: String,
  date: Date,
  coupon: String,
  paymentType: String,
  totalCost: String,
  isPaid: Boolean,
  cart: Object,
});

export default OrderSchema;
