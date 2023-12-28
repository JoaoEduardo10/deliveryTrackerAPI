import 'express-async-errors';
import express from 'express';
import { config } from 'dotenv';
import { router } from './router';
import { globalsErrorMiddleware } from './middlewares/globals-errors';
import cors from 'cors';
import swagger from 'swagger-ui-express';
import { Jsonfiles } from './helpers/configure-env-for-json';
import swaggerDocsJson from './swagger.json';

const app = express();
config();
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');

  next();
});

const version = process.env.VERSION;

app.use(`${version}`, router);

const jsonFileSwaggerPath = 'src/app/swagger.json';

Jsonfiles.read({ jsonFilePath: jsonFileSwaggerPath }).then((swaggerDocs) => {
  const docs = swaggerDocs ?? swaggerDocsJson;

  app.use(
    `${version}/delivery/documentation`,
    swagger.serve,
    swagger.setup(docs),
  );
});

app.use(globalsErrorMiddleware);
export { app };
