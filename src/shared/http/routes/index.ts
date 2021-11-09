import { Router } from 'express'
import ProductsController from '@modules/products/controllers/ProductsController'

const router = Router()

const productController = new ProductsController()

router.get('/', productController.index)
router.post('/create', productController.create)

export default router
