import { Router } from 'express';
import productsRouter from '@modules/products/routes/products.routes';
import userRouter from '@modules/users/routes/user.routes';
import sessionsRouter from '@modules/users/routes/sessions.routes';
import passwordRouter from '@modules/users/routes/password.routes';

const router = Router()

router.use('/products', productsRouter);
router.use('/users', userRouter);
router.use('/session', sessionsRouter);
router.use('/password', passwordRouter);

export default router;
