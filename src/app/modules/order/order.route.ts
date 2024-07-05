import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { OrderValidations } from './order.validation';
import { OrderControllers } from './order.controller';

const router = Router();

router.post(
  '/',
  validateRequest(OrderValidations.createOrderValidationSchema),
  OrderControllers.createOrder,
);

export const OrderRoutes = router;
