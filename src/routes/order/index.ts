import express from 'express';
import { Routes } from '@/constants/routes';
import OrderController from '@/controllers/order';
import authMiddleware from '@/constants/middlewares/authMiddleware';
import adminOnlyMiddleware from '@/constants/middlewares/adminOnlyMiddleware';

const router = express.Router();
const route = Routes.ORDER;

router.post(Routes.ROOT, authMiddleware, OrderController.createNewOrder);

router.get(Routes.ROOT, authMiddleware, adminOnlyMiddleware, OrderController.getOrders);

export default { router, route };
