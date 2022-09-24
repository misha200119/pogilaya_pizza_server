import express from 'express';
import { Routes } from '@/constants/routes';

const router = express.Router();
const route = Routes.ORDER;

router.get(Routes.ROOT, (req, res, next) => {
  res.sendStatus(200);
});

router.post(Routes.ROOT, (req, res, next) => {
  console.log(req.body, 'req.body');

  res.sendStatus(200);
});

export default { router, route };
