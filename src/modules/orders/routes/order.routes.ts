import { Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate'
import OdersController from '../controllers/OrdersController'

const orderRouter = Router()

const orderController = new OdersController()

orderRouter.get(
    '/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.number().required()
        }
    }),
    orderController.show,
    )
orderRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            customer_id: Joi.number().required(),
            products: Joi.required(),
        }
    }),
    orderController.create
    );
export default orderRouter;
