import { Router } from 'express'
import productsRouter from '@modules/products/routes/products.routes'
import userRouter from '@modules/users/routes/user.routes'
import SessionsRouter from '@modules/users/routes/sessions.routes'

const router = Router()

router.use('/products', productsRouter)
router.use('/users', userRouter)
router.use('/session', SessionsRouter)

export default router
