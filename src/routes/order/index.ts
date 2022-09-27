import express from 'express';
import { Routes } from '@/constants/routes';
import NewOrder from '@/types/routes/order/newOrder';
import Order from '@/db/models/order/model';

const router = express.Router();
const route = Routes.ORDER;

router.get(Routes.ROOT, (req, res, next) => {
  res.sendStatus(200);
});

router.post(Routes.ROOT, async (req, res, next) => {
  const { data } = req.body as { data: NewOrder };
  const { orderDetails, cart } = data;

  const document = { ...orderDetails, cart, isPaid: false };

  console.log(document, 'document');

  const newOrder = new Order(document);

  console.log(newOrder);
  await newOrder.save();

  res.status(200).send('haahahha sosi loh');
});

export default { router, route };
