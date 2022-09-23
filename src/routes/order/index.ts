import express from 'express';
import { Routes } from '@/constants/routes';

const router = express.Router();
const route = Routes.ORDER;

router.get(Routes.ROOT, (req, res, next) => {
  res.sendStatus(200);
});

export default { router, route };
