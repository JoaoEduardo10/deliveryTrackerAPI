import { Bad_Request } from '../errors/api-error';
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
      throw new Bad_Request(
        'Não foi possivel registra a entrega: Adicine o email do entregador!',
      );
    }
    if (!deliveredByName) {
      throw new Bad_Request(
        'Não foi possivel registra a entrega: Adicione o nome do entregador!',
      );
    }

    if (!imageReference) {
      throw new Bad_Request(
        'Não foi possivel registra a entrega: Adicione A imagem de referencia!',
      );
    }

    if (!latitude || !longitude) {
      throw new Bad_Request(
        'Não foi possivel registra a entrega: Falata a longitude e latitude!',
      );
    }

    if (!recipient || !recipient.cpf_cnpj) {
      throw new Bad_Request(
        'Não foi possivel registra a entrega: Cpf ou CNPJ do cliente é necessario!',
      );
    }

    if (!recipient || !recipient.boletus_id) {
      throw new Bad_Request(
        'Não foi possivel registra a entrega: id do boleto é necessario!',
      );
    }
  }
}

export { DeliveryValidator };
