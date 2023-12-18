import 'express-async-errors';
import express from 'express';
import { config } from 'dotenv';
import { router } from './router';
import { globalsErrorMiddleware } from './middlewares/globals-errors';
import cors from 'cors';

const app = express();
config();
app.use(express.json());
app.use(cors());

app.use(`${process.env.VERSION}`, router);

app.use(globalsErrorMiddleware);
export { app };
