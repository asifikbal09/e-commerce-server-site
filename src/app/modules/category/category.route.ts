import { Router } from 'express';
import { CategoryControllers } from './category.controller';
import validateRequest from '../../middlewares/validateRequest';
import { CategoryValidation } from './category.validation';

const router = Router();

router.post(
  '/',
  validateRequest(CategoryValidation.categoryValidationSchema),
  CategoryControllers.createCategoryForCourse,
);

router.get('/', CategoryControllers.getAllCategories);

export const CategoryRoutes = router;
