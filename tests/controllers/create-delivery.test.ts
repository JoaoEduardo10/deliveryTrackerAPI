/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  CreateDeliveryParams,
  CreateDeliveryRepository,
} from '../../src/app/repositories/create-delivery/protocols';
import { IApiRequest } from '../../src/app/controller/protocols';
import { CreateDeliveryController } from '../../src/app/controller/create-delivery';
import { DeliveryDTO } from '../../src/interface/delivery';
import { v4 as uuid } from 'uuid';
import { describe, expect, it, vi } from 'vitest';
import { ImageUploaderRepository } from '../../src/app/repositories/upload-image-storege';

class MockCreateDeliveryRepository implements CreateDeliveryRepository {
  private deliverys: DeliveryDTO[];

  constructor() {
    this.deliverys = [];
  }

  private set_delivery(params: CreateDeliveryParams) {
    const delivery = {
      id: uuid(),
      ...params,
      deliveryDate: new Date(),
    };

    this.deliverys.push({
      ...delivery,
    });

    return delivery;
  }

  get_delivery() {
    return this.deliverys;
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

    const delivery = this.set_delivery({
      deliveredByEmail,
      deliveredByName,
      imageReference,
      latitude,
      longitude,
      recipient,
    });

    return delivery;
  }
}

const req_one: IApiRequest<CreateDeliveryParams> = {
  body: {
    deliveredByEmail: 'entregador@interativabr.com.br',
    deliveredByName: 'entregador',
    imageReference: 'entregador.png',
    latitude: -10222245,
    longitude: -40000390,
    recipient: {
      cpf_cnpj: '091-987-243-12',
    },
  },
};

const req_two: IApiRequest<any> = {};

describe('create-delivery', () => {
  it('should create delivery', async () => {
    vi.spyOn(
      ImageUploaderRepository.prototype,
      'processAndSaveImage',
    ).mockReturnValue(Promise.resolve({ imageUrl: 'http://test.jpg' }));

    const repository = new MockCreateDeliveryRepository();
    const controller = new CreateDeliveryController(repository);

    expect(repository.get_delivery().length).toBe(0);

    const { body, statusCode } = await controller.handle(req_one);

    expect(repository.get_delivery().length).toBe(1);

    expect(statusCode).toBe(201);
    expect(body.id).toBeTruthy();
    expect(body.imageReference).toBe('http://test.jpg');
  });

  it('should create delivery', async () => {
    vi.spyOn(
      ImageUploaderRepository.prototype,
      'processAndSaveImage',
    ).mockReturnValue(Promise.resolve({ imageUrl: 'http://test.jpg' }));

    const repository = new MockCreateDeliveryRepository();
    const controller = new CreateDeliveryController(repository);

    try {
      const { body } = await controller.handle(req_two);

      expect(body.id).not.toBeTruthy();
    } catch (error) {
      expect(error).toBeTruthy();

      expect((error as Error).message).toBe(
        'Não foi possivel registra a entrega',
      );
    }
  });
});
