import { DeliveryDTO } from '../../../interface/delivery';

export interface CreateDeliveryParams {
  deliveredByName: string;
  deliveredByEmail: string;
  recipient: {
    cpf_cnpj: string;
    email?: string;
    number?: string;
    someoneAtHome?: boolean;
  };
  latitude: number;
  longitude: number;
  imageReference: string;
}

export interface CreateDeliveryRepository {
  create(params: CreateDeliveryParams): Promise<DeliveryDTO>;
}
