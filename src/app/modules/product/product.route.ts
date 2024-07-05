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

router.get('/', ProductController.getAllProduct);

router.get('/:productId', ProductController.getSingleProduct);

router.put(
  '/:productId',
  validateRequest(ProductValidations.updateProductValidationSchema),
  ProductController.updateProduct,
);

export const ProductRoutes = router;
