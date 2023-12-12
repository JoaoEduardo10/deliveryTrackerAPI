import express from 'express';
import { config } from 'dotenv';

const app = express();
config();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('ok');
});

export { app };
