import express from 'express';
import { Routes } from '@/constants/routes';

const router = express.Router();
const route = Routes.ROOT;

router.get(Routes.ROOT, (req, res, next) => {
  res.status(200).send('Ok 123');
});

export default { router, route };
