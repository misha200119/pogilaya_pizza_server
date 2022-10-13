import DeliveryType from '@/interfaces/db/deliveryType';

/**
 * When you put some value to date to create new document in bd just
 * put @type {moment.Moment}
 * get @type {number}
 */
interface OrderDetails {
  selectedDeliveryType: DeliveryType;
  nameField: string;
  phoneNumberField: string;
  street: string;
  email: string;
  house: string;
  flat: string;
  entrance: string;
  intercomCode: string;
  floor: string;
  comment: string;
  date: Number;
  coupon: string;
  paymentType: string;
  totalCost?: string;
}

export default OrderDetails;
