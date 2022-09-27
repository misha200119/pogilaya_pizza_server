import { Moment } from 'moment';

interface OrderDetails {
  selectedDeliveryType: string;
  nameField: string;
  phoneNumberField: string;
  email: string;
  house: string;
  flat: string;
  entrance: string;
  intercomCode: string;
  floor: string;
  comment: string;
  date: Moment;
  coupon: string;
  paymentType: string;
  totalCost?: string;
}

export default OrderDetails;
