import rootRouter from '@/routes';
import orderRouter from '@/routes/order';
import authRouter from '@/routes/auth';
import adminRouter from '@/routes/admin';

export const expressRouters = [rootRouter, orderRouter, authRouter, adminRouter];
