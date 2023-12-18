import { beforeEach, describe, expect, it } from 'vitest';
import { serverTest } from '../setup';
import { createJwt } from '../../src/app/helpers/jsonwebtoken';
import { Delivery } from '../../src/model/Delivery';

describe('create-delivery', () => {
  const user = {
    token: '',
  };

  beforeEach(async () => {
    const token = createJwt({
      email: '',
      id: '',
      jobs: '',
      name: '',
    });

    user.token = token;
  });

  it('should return an error for not adding an email in the body of the request', async () => {
    const { body, statusCode } = await serverTest
      .post(`${process.env.VERSION}/delivery`)
      .set('Authorization', `${process.env.TYPE_JWT} ${user.token}`);

    expect(statusCode).toBe(400);
    expect(body).toEqual({
      error:
        'Não foi possivel registra a entrega: Adicine o email do entregador!',
    });
  });

  it('should return an error for not adding an name in the body of the request', async () => {
    const { body, statusCode } = await serverTest
      .post(`${process.env.VERSION}/delivery`)
      .set('Authorization', `${process.env.TYPE_JWT} ${user.token}`)
      .send({
        deliveredByEmail: 'test@interativabr.com.br',
      });

    expect(statusCode).toBe(400);
    expect(body).toEqual({
      error:
        'Não foi possivel registra a entrega: Adicione o nome do entregador!',
    });
  });

  it('should return an error for not adding an imageReference in the body of the request', async () => {
    const { body, statusCode } = await serverTest
      .post(`${process.env.VERSION}/delivery`)
      .set('Authorization', `${process.env.TYPE_JWT} ${user.token}`)
      .send({
        deliveredByEmail: 'test@interativabr.com.br',
        deliveredByName: 'test',
      });

    expect(statusCode).toBe(400);
    expect(body).toEqual({
      error:
        'Não foi possivel registra a entrega: Adicione A imagem de referencia!',
    });
  });

  it('should return an error for not adding an latitude in the body of the request', async () => {
    const { body, statusCode } = await serverTest
      .post(`${process.env.VERSION}/delivery`)
      .set('Authorization', `${process.env.TYPE_JWT} ${user.token}`)
      .send({
        deliveredByEmail: 'test@interativabr.com.br',
        deliveredByName: 'test',
        imageReference:
          'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAA',
        longitude: -22334455,
      });

    expect(statusCode).toBe(400);
    expect(body).toEqual({
      error:
        'Não foi possivel registra a entrega: Falata a longitude e latitude!',
    });
  });

  it('should return an error for not adding an longitude in the body of the request', async () => {
    const { body, statusCode } = await serverTest
      .post(`${process.env.VERSION}/delivery`)
      .set('Authorization', `${process.env.TYPE_JWT} ${user.token}`)
      .send({
        deliveredByEmail: 'test@interativabr.com.br',
        deliveredByName: 'test',
        imageReference:
          'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAA',
        latitude: -22334455,
      });

    expect(statusCode).toBe(400);
    expect(body).toEqual({
      error:
        'Não foi possivel registra a entrega: Falata a longitude e latitude!',
    });
  });

  it('should return an error for not adding an recipient in the body of the request', async () => {
    const { body, statusCode } = await serverTest
      .post(`${process.env.VERSION}/delivery`)
      .set('Authorization', `${process.env.TYPE_JWT} ${user.token}`)
      .send({
        deliveredByEmail: 'test@interativabr.com.br',
        deliveredByName: 'test',
        imageReference:
          'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAA',
        longitude: -22334455,
        latitude: -22334455,
      });

    expect(statusCode).toBe(400);
    expect(body).toEqual({
      error:
        'Não foi possivel registra a entrega: Cpf ou CNPJ do cliente é necessario!',
    });
  });

  it('should return an error for not adding an recipient.cpf_cnpj in the body of the request', async () => {
    const { body, statusCode } = await serverTest
      .post(`${process.env.VERSION}/delivery`)
      .set('Authorization', `${process.env.TYPE_JWT} ${user.token}`)
      .send({
        deliveredByEmail: 'test@interativabr.com.br',
        deliveredByName: 'test',
        imageReference:
          'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAA',
        longitude: -22334455,
        latitude: -22334455,
      });

    expect(statusCode).toBe(400);
    expect(body).toEqual({
      error:
        'Não foi possivel registra a entrega: Cpf ou CNPJ do cliente é necessario!',
    });
  });

  it('should return an error for adding an invalid cpf_cnpj', async () => {
    const { body, statusCode } = await serverTest
      .post(`${process.env.VERSION}/delivery`)
      .set('Authorization', `${process.env.TYPE_JWT} ${user.token}`)
      .send({
        deliveredByEmail: 'test@interativabr.com.br',
        deliveredByName: 'test',
        imageReference:
          'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAA',
        longitude: -22334455,
        latitude: -22334455,
        recipient: {
          boletus_id: 12343432,
          cpf_cnpj: '091.932.143-11',
        },
      });

    expect(statusCode).toBe(400);
    expect(body).toEqual({
      error: 'cpf invalido!',
    });
  });

  it('should return an error for adding an invalid boletus_id', async () => {
    const { body, statusCode } = await serverTest
      .post(`${process.env.VERSION}/delivery`)
      .set('Authorization', `${process.env.TYPE_JWT} ${user.token}`)
      .send({
        deliveredByEmail: 'test@interativabr.com.br',
        deliveredByName: 'test',
        imageReference:
          'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAA',
        longitude: -22334455,
        latitude: -22334455,
        recipient: {
          cpf_cnpj: '091.932.143-11',
        },
      });

    expect(statusCode).toBe(400);
    expect(body).toEqual({
      error: 'Não foi possivel registra a entrega: id do boleto é necessario!',
    });
  });

  it('should return an error for adding a boleto ID already added', async () => {
    await Delivery.create({
      deliveredByEmail: 'entregador@interativabr.com.br',
      deliveredByName: 'entregador',
      imageReference: 'entregador.png',
      latitude: -10222245,
      longitude: -40000390,
      recipient: {
        cpf_cnpj: '091.922.144-22',
        boletus_id: 11002233,
      },
    });

    const { body, statusCode } = await serverTest
      .post(`${process.env.VERSION}/delivery`)
      .set('Authorization', `${process.env.TYPE_JWT} ${user.token}`)
      .send({
        deliveredByEmail: 'test@interativabr.com.br',
        deliveredByName: 'test',
        imageReference:
          'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAA',
        longitude: -22334455,
        latitude: -22334455,
        recipient: {
          cpf_cnpj: '091.931.143-11',
          boletus_id: 11002233,
        },
      });

    expect(statusCode).toBe(400);
    expect(body).toEqual({
      error: 'Boleto já adicinado',
    });
  });

  it('should return an error for adding an invalid number', async () => {
    const { body, statusCode } = await serverTest
      .post(`${process.env.VERSION}/delivery`)
      .set('Authorization', `${process.env.TYPE_JWT} ${user.token}`)
      .send({
        deliveredByEmail: 'test@interativabr.com.br',
        deliveredByName: 'test',
        imageReference:
          'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAA',
        longitude: -22334455,
        latitude: -22334455,
        recipient: {
          boletus_id: 665832,
          cpf_cnpj: '091.931.143-11',
          number: '989981320524',
        },
      });

    expect(statusCode).toBe(400);
    expect(body).toEqual({
      error: 'Numero invalido',
    });
  });

  it('should return an error for adding an invalid email', async () => {
    const { body, statusCode } = await serverTest
      .post(`${process.env.VERSION}/delivery`)
      .set('Authorization', `${process.env.TYPE_JWT} ${user.token}`)
      .send({
        deliveredByEmail: 'test@interativabr.com.br',
        deliveredByName: 'test',
        imageReference:
          'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAA',
        longitude: -22334455,
        latitude: -22334455,
        recipient: {
          boletus_id: 12343432,
          cpf_cnpj: '091.931.143-11',
          number: '98981320524',
          email: 'joao',
        },
      });

    expect(statusCode).toBe(400);
    expect(body).toEqual({
      error: 'formato de email invalido',
    });
  });
});
