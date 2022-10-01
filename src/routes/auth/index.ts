import { Routes } from '@/constants/routes';
import express from 'express';
import AuthController from '@/controllers/auth';

const router = express.Router();
const route = Routes.AUTH;

router.post(Routes.REGISTRATION, AuthController.registration);

router.get(`${Routes.ACTIVATION}/:link`, AuthController.activation);

router.post(Routes.LOGIN, AuthController.login);

router.post(Routes.LOGOUT, AuthController.logout);

export default { router, route };
