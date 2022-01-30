import { Router } from 'express';
import productsRouter from '@modules/products/infra/http/routes/products.routes';
import userRouter from '@modules/users/infra/http/routes/user.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import customerRouter from '@modules/customers/infra/http/routes/customer.routes';
import orderRouter from '@modules/orders/infra/http/routes/order.routes';

const router = Router()

router.use('/products', productsRouter);
router.use('/users', userRouter);
router.use('/session', sessionsRouter);
router.use('/password', passwordRouter);
router.use('/profile', profileRouter);
router.use('/customers', customerRouter);
router.use('/order', orderRouter);

export default router;
