import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import CustomerController from '../controllers/CustomerController';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';

const customerRouter = Router();
const customerController = new CustomerController();

customerRouter.use(isAuthenticated);

customerRouter.get('/', customerController.index);
customerRouter.get('/:id', customerController.show);
customerRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
        }
    }),
    customerController.create
);
customerRouter.put(
    '/',
    celebrate({
    [Segments.BODY]: {
        name: Joi.string().email().required(),
        email: Joi.string().required(),
    },
        [Segments.PARAMS]: {
            id: Joi.number().required()
        }
    }),
    customerController.update
);
customerRouter.delete(
    '/',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.number().required()
        }
    }),
    customerController.delete
);




export default customerRouter;
