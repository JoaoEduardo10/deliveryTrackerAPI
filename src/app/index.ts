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

console.log(
  Buffer.from(
    '1:1b09acb4f930a5a91b7c9d8b0563d21befaf49e0d64ec6e5ed5db7d743fbd173',
  ).toString('base64'),
);

app.use(globalsErrorMiddleware);
export { app };
