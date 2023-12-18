import { Router } from 'express';
import { CreateDeliveryMiddleware } from './middlewares/create-delivery';
import { AuthenticationMiddleware } from './middlewares/authentication';
import { CreateDeliveryRouter } from './usecase/create-delivery';

const router = Router();

router.post(
  '/delivery',
  AuthenticationMiddleware.middleware,
  CreateDeliveryMiddleware.middleware,
  CreateDeliveryRouter.create,
);

export { router };
