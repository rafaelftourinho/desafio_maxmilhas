import express from 'express';
import { ErrorHandler } from '../infrastructure/middlewares/Error';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import userRoutes from '../infrastructure/routes/user.routes';

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use('/cpf', userRoutes)
app.use(ErrorHandler.execute);
// app.use('/', (_req, res) => res.json({ ok: true }));

export default app;
