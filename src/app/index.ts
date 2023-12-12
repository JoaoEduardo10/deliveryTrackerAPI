import express from 'express';
import { config } from 'dotenv';
import { router } from './router';

const app = express();
config();
app.use(express.json());

app.use(`${process.env.VERSION}`, router);

export { app };
