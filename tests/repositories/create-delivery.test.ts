/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, expect, it, vi } from 'vitest';
import { MongoCreateDelivaryRepository } from '../../src/app/repositories/create-delivery';
import { CreateDeliveryParams } from '../../src/app/repositories/create-delivery/protocols';
import { Delivery } from '../../src/model/Delivery';

describe('create-delivery', () => {
  it('should create delivery', async () => {
    const repository = new MongoCreateDelivaryRepository();

    const delivery = await repository.create({
      deliveredByEmail: 'entregador@interativabr.com.br',
      deliveredByName: 'entregador',
      imageReference: 'entregador.png',
      latitude: -10222245,
      longitude: -40000390,
      recipient: {
        cpf_cnpj: '091-987-243-12',
        boletus_id: 23546576564333,
      },
    });

    expect(delivery.id).toBeTruthy();
    expect(delivery.latitude).toBeTruthy();
    expect(delivery.longitude).toBeTruthy();
    expect(delivery.deliveredByEmail).toBeTruthy();
    expect(delivery.imageReference).toBeTruthy();
    expect(delivery.recipient.cpf_cnpj).toBeTruthy();
  });

  it('should not create the delivery by not adding the delivery email', async () => {
    const repository = new MongoCreateDelivaryRepository();

    try {
      const delivery = await repository.create({
        deliveredByName: 'entregador',
        imageReference: 'entregador.png',
        latitude: -10222245,
        longitude: -40000390,
        recipient: {
          cpf_cnpj: '091-987-243-12',
        },
      } as CreateDeliveryParams);

      expect(delivery.id).not.toBeTruthy();
    } catch (error) {
      expect(error).toBeTruthy();

      expect((error as Error).message).toBe(
        'Não foi possivel registra a entrega: Adicine o email do entregador!',
      );
    }
  });

  it('should not create the delivery by not adding the delivery name', async () => {
    const repository = new MongoCreateDelivaryRepository();

    try {
      const delivery = await repository.create({
        deliveredByEmail: 'entregador@interativabr.com.br',
        imageReference: 'entregador.png',
        latitude: -10222245,
        longitude: -40000390,
        recipient: {
          cpf_cnpj: '091-987-243-12',
        },
      } as CreateDeliveryParams);

      expect(delivery.id).not.toBeTruthy();
    } catch (error) {
      expect(error).toBeTruthy();

      expect((error as Error).message).toBe(
        'Não foi possivel registra a entrega: Adicione o nome do entregador!',
      );
    }
  });

  it('should not create the delivery by not adding the imageReference', async () => {
    const repository = new MongoCreateDelivaryRepository();

    try {
      const delivery = await repository.create({
        deliveredByEmail: 'entregador@interativabr.com.br',
        deliveredByName: 'entregador',
        latitude: -10222245,
        longitude: -40000390,
        recipient: {
          cpf_cnpj: '091-987-243-12',
        },
      } as CreateDeliveryParams);

      expect(delivery.id).not.toBeTruthy();
    } catch (error) {
      expect(error).toBeTruthy();

      expect((error as Error).message).toBe(
        'Não foi possivel registra a entrega: Adicione A imagem de referencia!',
      );
    }
  });

  it('should not create the delivery by not adding the latitude', async () => {
    const repository = new MongoCreateDelivaryRepository();

    try {
      const delivery = await repository.create({
        deliveredByEmail: 'entregador@interativabr.com.br',
        deliveredByName: 'entregador',
        imageReference: 'entregador.png',
        longitude: -40000390,
        recipient: {
          cpf_cnpj: '091-987-243-12',
        },
      } as CreateDeliveryParams);

      expect(delivery.id).not.toBeTruthy();
    } catch (error) {
      expect(error).toBeTruthy();

      expect((error as Error).message).toBe(
        'Não foi possivel registra a entrega: Falata a longitude e latitude!',
      );
    }
  });

  it('should not create the delivery by not adding the longitude', async () => {
    const repository = new MongoCreateDelivaryRepository();

    try {
      const delivery = await repository.create({
        deliveredByEmail: 'entregador@interativabr.com.br',
        deliveredByName: 'entregador',
        imageReference: 'entregador.png',
        latitude: -10222245,
        recipient: {
          cpf_cnpj: '091-987-243-12',
        },
      } as CreateDeliveryParams);

      expect(delivery.id).not.toBeTruthy();
    } catch (error) {
      expect(error).toBeTruthy();

      expect((error as Error).message).toBe(
        'Não foi possivel registra a entrega: Falata a longitude e latitude!',
      );
    }
  });

  it('should not create the delivery by not adding the recepient cpf_cnpj', async () => {
    const repository = new MongoCreateDelivaryRepository();

    try {
      const delivery = await repository.create({
        deliveredByEmail: 'entregador@interativabr.com.br',
        deliveredByName: 'entregador',
        imageReference: 'entregador.png',
        latitude: -10222245,
        longitude: -40000390,
        recipient: {},
      } as CreateDeliveryParams);

      expect(delivery.id).not.toBeTruthy();
    } catch (error) {
      expect(error).toBeTruthy();

      expect((error as Error).message).toBe(
        'Não foi possivel registra a entrega: Cpf ou CNPJ do cliente é necessario!',
      );
    }
  });

  it('should not create the delivery by not adding the recepient boletus_id', async () => {
    const repository = new MongoCreateDelivaryRepository();

    try {
      const delivery = await repository.create({
        deliveredByEmail: 'entregador@interativabr.com.br',
        deliveredByName: 'entregador',
        imageReference: 'entregador.png',
        latitude: -10222245,
        longitude: -40000390,
        recipient: {
          cpf_cnpj: '091.922.144-22',
        },
      } as CreateDeliveryParams);

      expect(delivery.id).not.toBeTruthy();
    } catch (error) {
      expect(error).toBeTruthy();

      expect((error as Error).message).toBe(
        'Não foi possivel registra a entrega: id do boleto é necessario!',
      );
    }
  });

  it('should not create the delivery by not adding the recipient', async () => {
    const repository = new MongoCreateDelivaryRepository();

    try {
      const delivery = await repository.create({
        deliveredByEmail: 'entregador@interativabr.com.br',
        deliveredByName: 'entregador',
        imageReference: 'entregador.png',
        latitude: -10222245,
        longitude: -40000390,
      } as CreateDeliveryParams);

      expect(delivery.id).not.toBeTruthy();
    } catch (error) {
      expect(error).toBeTruthy();

      expect((error as Error).message).toBe(
        'Não foi possivel registra a entrega: Cpf ou CNPJ do cliente é necessario!',
      );
    }
  });

  it('should not create a delivery error in the databasey', async () => {
    const repository = new MongoCreateDelivaryRepository();

    vi.spyOn(Delivery, 'create').mockReturnValue(null as any);
    try {
      const delivery = await repository.create({
        deliveredByEmail: 'entregador@interativabr.com.br',
        deliveredByName: 'entregador',
        imageReference: 'entregador.png',
        latitude: -10222245,
        longitude: -40000390,
        recipient: {
          cpf_cnpj: '091-987-243-12',
          boletus_id: 345456776543,
        },
      });

      expect(delivery.id).not.toBeTruthy();
    } catch (error) {
      expect(error).toBeTruthy();

      expect((error as Error).message).toBe(
        'Não foi possivel registra a entrega',
      );
    }
  });
});
