import MapOfSelectedProducts from '@/types/reusableTypes/mapOfSelectedProducts';
import OrderDetails from '@/types/reusableTypes/orderDetails';

interface NewOrder {
  cart: MapOfSelectedProducts;
  orderDetails: OrderDetails;
}

export default NewOrder;
