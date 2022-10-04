import express from 'express';
import { Routes } from '@/constants/routes';
import OrderController from '@/controllers/order';
import dataValidationMiddleware from '@/constants/middlewares/validationMiddlewares/routes/order/data';
import authMiddleware from '@/constants/middlewares/authMiddleware';
import adminOnlyMiddleware from '@/constants/middlewares/adminOnlyMiddleware';

const router = express.Router();
const route = Routes.ORDER;

router.post(Routes.ROOT, dataValidationMiddleware, authMiddleware, OrderController.createNewOrder);

router.get(Routes.ROOT, authMiddleware, adminOnlyMiddleware, OrderController.getOrders);

export default { router, route };
