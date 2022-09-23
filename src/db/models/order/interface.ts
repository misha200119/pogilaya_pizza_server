import DeliveryType from '@/interfaces/db/deliveryType';
import OrderCart from '@/interfaces/db/orderCart';
import { Moment } from 'moment-timezone';
import { ObjectId } from 'mongoose';
interface IOrder {
  _id: ObjectId;
  orderTime: string;
  deliveryType: DeliveryType;
  name: string;
  phoneNumber: string;
  email: string;
  street: string;
  house: string;
  flat: string;
  entrance: string;
  intercomCode: string;
  floor: Number;
  comment: string;
  offCoupon: string;
  paymantType: string;
  totalCost: number;
  isPaid: boolean;
  // orderCart: OrderCart;
}

export default IOrder;
