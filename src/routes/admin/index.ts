import { Routes } from '@/constants/routes';
import express from 'express';
import AdminController from '@/controllers/admin';
import authMiddleware from '@/constants/middlewares/authMiddleware';
import adminOnlyMiddleware from '@/constants/middlewares/adminOnlyMiddleware';

const router = express.Router();
const route = Routes.ADMIN;

router.get(Routes.ANALITICS, authMiddleware, adminOnlyMiddleware, AdminController.getAnalitics);

export default { router, route };
