import { Internal_Server_Error } from '../errors/api-error';
import { CreateDeliveryParams } from '../repositories/create-delivery/protocols';

class DeliveryValidator {
  static validateDeliveryRegistration(params: CreateDeliveryParams): void {
    const {
      deliveredByEmail,
      deliveredByName,
      imageReference,
      latitude,
      longitude,
      recipient,
    } = params;

    if (!deliveredByEmail) {
      throw new Internal_Server_Error('Não foi possivel registra a entrega');
    }
    if (!deliveredByName) {
      throw new Internal_Server_Error('Não foi possivel registra a entrega');
    }

    if (!imageReference) {
      throw new Internal_Server_Error('Não foi possivel registra a entrega');
    }

    if (!latitude || !longitude) {
      throw new Internal_Server_Error('Não foi possivel registra a entrega');
    }

    if (!recipient || !recipient.cpf_cnpj) {
      throw new Internal_Server_Error('Não foi possivel registra a entrega');
    }
  }
}

export { DeliveryValidator };
