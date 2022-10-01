import { Routes } from '@/constants/routes';
import express from 'express';
import AuthController from '@/controllers/auth';
import loginValidationMiddleware from '@/constants/middlewares/validationMiddlewares/routes/auth/login';
import passwordValidationMiddleware from '@/constants/middlewares/validationMiddlewares/routes/auth/password';

const router = express.Router();
const route = Routes.AUTH;

router.post(Routes.REGISTRATION, loginValidationMiddleware, passwordValidationMiddleware, AuthController.registration);

router.get(`${Routes.ACTIVATION}/:link`, AuthController.activation);

router.post(Routes.LOGIN, AuthController.login);

router.post(Routes.LOGOUT, AuthController.logout);

export default { router, route };
