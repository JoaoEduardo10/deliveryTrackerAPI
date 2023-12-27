import { Router } from 'express';
import { CreateDeliveryMiddleware } from './middlewares/create-delivery';
import { AuthenticationMiddleware } from './middlewares/authentication';
import { CreateDeliveryRouter } from './usecase/create-delivery';
import { Bad_Request } from './errors/api-error';

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

    res.status(200).json({
      client: {
        id: '1232',
        razao: 'test',
        endereco: 'test',
        email: 'test@interativabr.com.br',
      },
    });
  },
);

export { router };
