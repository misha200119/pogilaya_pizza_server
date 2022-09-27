import express from 'express';
import { Routes } from '@/constants/routes';
import NewOrder from '@/types/routes/order/newOrder';

const router = express.Router();
const route = Routes.ORDER;

router.get(Routes.ROOT, (req, res, next) => {
  res.sendStatus(200);
});

router.post(Routes.ROOT, (req, res, next) => {
  const { data } = req.body as { data: NewOrder };
  console.log(data, 'req.body');

  res.status(200).send('haahahha sosi loh');
});

export default { router, route };
