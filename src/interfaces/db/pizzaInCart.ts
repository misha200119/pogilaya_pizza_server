import Pizza from './pizza';

interface PizzaInCart extends Omit<Pizza, 'sizes' | 'doughSizes'> {
  size: string;
  doughSize: string;
}

export default PizzaInCart;
