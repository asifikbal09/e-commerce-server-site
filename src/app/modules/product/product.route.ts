import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ProductValidations } from './product.validation';
import { ProductController } from './product.controller';

const router = Router();

router.post(
  '/',
  validateRequest(ProductValidations.createProductValidationSchema),
  ProductController.createProduct,
);

export const ProductRoutes = router;
