import { Router } from 'express';
import { CreateDeliveryMiddleware } from './middlewares/create-delivery';
import { AuthenticationMiddleware } from './middlewares/authentication';
import { CreateDeliveryRouter } from './usecase/create-delivery';
import { Unauthorized } from './errors/api-error';
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
      throw new Unauthorized('Adicione o cpf ou cnpj para validação');
    }

    const ixc = new IXC();

    const client = await ixc.get_client({ cpf_cnpj: cpf_cnpj as string });

    if (typeof client == 'string') {
      throw new Unauthorized('CPF ou CNPJ invalido');
    }

    res.status(200).json({ client: client[0] });
  },
);

export { router };
