import express, { Request, Response } from 'express';
import cors from 'cors';
import router from './app/router';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api', router);

app.get('/', (req: Request, res: Response) =>
  res.send('Welcome to E-commerce server site.'),
);

app.use(globalErrorHandler);

app.use(notFound);

export default app;
