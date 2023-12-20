import express, { Request, Response } from 'express';
import cors from 'cors';
import router from './app/router';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import { CourseController } from './app/modules/course/course.controller';
import validateRequest from './app/middlewares/validateRequest';
import { CourseValidation } from './app/modules/course/course.validation';
const app = express();

app.use(express.json());
app.use(cors());

app.use('/api', router);
app.post(
  '/api/course',
  validateRequest(CourseValidation.courseValidationSchema),
  CourseController.createCourse,
);

app.get('/', (req: Request, res: Response) => res.send('Hello World!'));

app.use(globalErrorHandler);

export default app;
