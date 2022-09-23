import { ModelNames } from '@/constants/db/models';
import { model } from 'mongoose';
import OrderInterface from './interface';
import OrderSchema from './schema';

const Order = model<OrderInterface>(ModelNames.ORDER, OrderSchema);

export default Order;
