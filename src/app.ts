import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import qrRoutes from './routes/qr.routes';
import {errorHandler} from './middlewares/error.middleware';


dotenv.config();


export const createApp = () => {
  const app = express();
  app.use(cors({origin: process.env.FRONTEND_URL || '*'}));
  app.use(express.json());


  app.use('/auth', authRoutes);
  app.use('/qr', qrRoutes);


  app.use(errorHandler);
  return app;
};