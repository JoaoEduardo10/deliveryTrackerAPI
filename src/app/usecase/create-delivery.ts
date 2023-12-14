import { Request, Response } from 'express';
import { MongoCreateDelivaryRepository } from '../repositories/create-delivery';
import { CreateDeliveryController } from '../controller/create-delivery';

class CreateDeliveryRouter {
  static async create(req: Request, res: Response) {
    const mongoCreateDeliveryrepository = new MongoCreateDelivaryRepository();
    const createDeliveryController = new CreateDeliveryController(
      mongoCreateDeliveryrepository,
    );

    const { body, statusCode } = await createDeliveryController.handle(req);

    res.status(statusCode).json({ delivery: body });
  }
}

export { CreateDeliveryRouter };
