import Good from './good';

/* eslint-disable no-shadow */
export enum Size {
  SMALL = 'small',
  MEDIUM = 'medium',
  BIG = 'big',
}

export enum DoughSize {
  THIN = 'thin',
  STANDART = 'standart',
  PHILADELPHY = 'philadelphy',
  BOARD_HOT_DOG = 'board hot dog',
}

export const SizeCost: { [key: string]: number } = {
  [Size.SMALL]: 0,
  [Size.MEDIUM]: 50,
  [Size.BIG]: 100,
};

export const DoughSizeCost: { [key: string]: number } = {
  [DoughSize.THIN]: 0,
  [DoughSize.STANDART]: 50,
  [DoughSize.PHILADELPHY]: 0,
  [DoughSize.BOARD_HOT_DOG]: 150,
};

interface Pizza extends Good {
  image: string;
  sizes: Array<Size>;
  doughSizes: Array<DoughSize>;
  cost: number;
  toppings: string;
}

export default Pizza;
