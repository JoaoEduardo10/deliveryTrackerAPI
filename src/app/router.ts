import { Router } from 'express';
import { CreateDeliveryMiddleware } from './middlewares/create-delivery';
import { AuthenticationMiddleware } from './middlewares/authentication';
import { CreateDeliveryRouter } from './usecase/create-delivery';
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
      return res
        .status(401)
        .json({ error: 'Adicione o cpf ou cnpj para validação' });
    }

    const ixc = new IXC();

    const client = await ixc.get_client({ cpf_cnpj: cpf_cnpj as string });

    if (typeof client == 'string') {
      return res
        .status(401)
        .json({ error: 'CPF ou CNPJ invalido: erro na api' + client });
    }

    res.status(200).json({ client: client[0] });
  },
);

export { router };
