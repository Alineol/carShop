import 'express-async-errors';
import express from 'express';
import errorHandler from './middlewares/error';
import carRoutes from './routes/car.routes';

const app = express();
app.use(express.json());
app.use(carRoutes);
app.use(errorHandler);

export default app;
