import { Router } from 'express';
import { CourseController } from './course.controller';

const router = Router();

router.post('/', CourseController.createCourse);

router.get('/courses', CourseController.getAllCourse);



export const CourseRoutes = router;
