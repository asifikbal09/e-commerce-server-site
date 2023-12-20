import { Router } from 'express';
import { CourseController } from './course.controller';


const router = Router();

router.get('/', CourseController.getAllCourse);
router.get('/:courseId/reviews', CourseController.getCourseWithReview);

export const CourseRoutes = router;
