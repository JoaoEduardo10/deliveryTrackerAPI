import express from 'express';
import { config } from 'dotenv';
import { router } from './router';
import { IXC } from './services/ixc';

const app = express();
config();
app.use(express.json());

app.use(`${process.env.VERSION}`, router);

const ixc = new IXC();

ixc
  .update_client({
    cpf_cnpj: '046.602.770-20',
    email: 'joaoeduardoj920@gmail.com',
    telefone_celular: '86981320524',
  })
  .then((data) => console.log(data));

export { app };
