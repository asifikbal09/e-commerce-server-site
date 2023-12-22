import { Router } from 'express';
import { ReviewController } from './review.controller';
import validateRequest from '../../middlewares/validateRequest';
import { ReviewValidations } from './review.validation';

const router = Router();

router.post(
  '/',
  validateRequest(ReviewValidations.reviewValidationSchema),
  ReviewController.createReviewForCourse,
);


export const ReviewRoutes = router;
