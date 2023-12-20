import { Router } from 'express';
import { CourseController } from './course.controller';
import validateRequest from '../../middlewares/validateRequest';
import { CourseValidation } from './course.validation';

const router = Router();

router.get('/', CourseController.getAllCourse);
router.get('/:courseId/reviews', CourseController.getCourseWithReview);
router.put(
  '/:courseId',
  validateRequest(CourseValidation.updateCourseValidationSchema),
  CourseController.updateCourseData,
);

export const CoursesRoutes = router;
