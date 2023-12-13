import { Internal_Server_Error } from '../../errors/api-error';
import { DeliveryDTO } from '../../../interface/delivery';
import { CreateDeliveryParams, CreateDeliveryRepository } from './protocols';
import { DeliveryValidator } from '../../helpers/deliveryValidator';
import { Delivery } from '../../../model/Delivery';

class MongoCreateDelivaryRepository implements CreateDeliveryRepository {
  private Delivery: typeof Delivery;

  constructor() {
    this.Delivery = Delivery;
  }

  async create(params: CreateDeliveryParams): Promise<DeliveryDTO> {
    const {
      deliveredByEmail,
      deliveredByName,
      imageReference,
      latitude,
      longitude,
      recipient,
    } = params;

    DeliveryValidator.validateDeliveryRegistration(params);

    const delivery = await this.Delivery.create({
      deliveredByEmail,
      deliveredByName,
      imageReference,
      latitude,
      longitude,
      recipient,
    });

    if (!delivery) {
      throw new Internal_Server_Error('Não foi possivel registra a entrega');
    }

    return {
      id: delivery._id.toHexString(),
      deliveredByName: delivery.deliveredByName,
      deliveredByEmail: deliveredByEmail,
      latitude: delivery.latitude,
      longitude: delivery.longitude,
      imageReference: delivery.imageReference,
      recipient: delivery.recipient,
      deliveryDate: delivery.deliveryDate,
    };
  }
}

export { MongoCreateDelivaryRepository };
