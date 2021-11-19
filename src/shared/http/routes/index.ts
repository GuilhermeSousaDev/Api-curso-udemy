import { Router } from 'express'
import productsRouter from '@modules/products/routes/products.routes'
import userRouter from '@modules/users/routes/user.routes'

const router = Router()

router.use('/products', productsRouter)
router.use('/users', userRouter)

export default router
