import express from 'express';
import { Routes } from '@/constants/routes';
import OrderController from '@/controllers/order';

const router = express.Router();
const route = Routes.ORDER;

router.post(Routes.ROOT, OrderController.createNewOrder);

router.get(Routes.ROOT, OrderController.getOrders);

export default { router, route };
