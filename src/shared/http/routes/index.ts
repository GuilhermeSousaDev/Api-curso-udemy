import { Router } from 'express';
import productsRouter from '@modules/products/routes/products.routes';
import userRouter from '@modules/users/routes/user.routes';
import sessionsRouter from '@modules/users/routes/sessions.routes';
import passwordRouter from '@modules/users/routes/password.routes';
import profileRouter from '@modules/users/routes/profile.routes';
import customerRouter from '@modules/customers/routes/customer.routes';

const router = Router()

router.use('/products', productsRouter);
router.use('/users', userRouter);
router.use('/session', sessionsRouter);
router.use('/password', passwordRouter);
router.use('/profile', profileRouter);
router.use('/customers', customerRouter);

export default router;
