import MapOfSelectedProducts from '@/types/reusableTypes/mapOfSelectedProducts';
import OrderDetails from '@/types/reusableTypes/orderDetails';
import { ObjectId } from 'mongoose';

interface IOrder extends OrderDetails {
  _id: ObjectId;
  isPaid: boolean;
  cart: MapOfSelectedProducts;
}

export default IOrder;
