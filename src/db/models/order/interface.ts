import DeliveryType from '@/interfaces/db/deliveryType';
import OrderCart from '@/interfaces/db/orderCart';
import { ObjectId } from 'mongoose';

/**
 * When you put some value to orderTime to create new document in bd just
 * put @type {moment.Moment}
 * get @type {number}
 */
interface IOrder {
  _id: ObjectId;
  orderTime: Number;
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
  orderCart: OrderCart;
}

export default IOrder;
