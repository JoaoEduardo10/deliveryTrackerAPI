import { Router } from 'express';
import { CreateDeliveryMiddleware } from './middlewares/create-delivery';
import { AuthenticationMiddleware } from './middlewares/authentication';
import { CreateDeliveryRouter } from './usecase/create-delivery';
import { Bad_Request, Unauthorized } from './errors/api-error';
import { IXC } from './services/ixc';

const router = Router();

router.post(
  '/delivery',
  AuthenticationMiddleware.middleware,
  CreateDeliveryMiddleware.middleware,
  CreateDeliveryRouter.create,
);

router.get(
  '/delivery',
  AuthenticationMiddleware.middleware,
  async (req, res) => {
    const { cpf_cnpj } = req.query;

    if (!cpf_cnpj) {
      throw new Bad_Request('Não foi possivel busca o cliente');
    }

    const ixc = new IXC();

    const client = await ixc.get_client({ cpf_cnpj: cpf_cnpj as string });

    if (typeof client === 'string') {
      throw new Unauthorized('Cliente invalido');
    }

    res.status(200).json({ client });
  },
);

export { router };
