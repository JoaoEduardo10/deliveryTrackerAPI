import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createJwt } from '../../src/app/helpers/jsonwebtoken';
import { serverTest } from '../setup';
import { ImageUploaderRepository } from '../../src/app/repositories/upload-image-storege';

describe('create-delivery', () => {
  const user = {
    token: '',
  };

  beforeEach(() => {
    const token = createJwt({
      email: '',
      id: '',
      jobs: '',
      name: '',
    });

    user.token = token;
  });
  it('should create a delivery', async () => {
    vi.spyOn(
      ImageUploaderRepository.prototype,
      'processAndSaveImage',
    ).mockReturnValue(Promise.resolve({ imageUrl: 'https://image.png' }));

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
          boletus_id: 23546576564333,
        },
      });

    expect(statusCode).toBe(201);
    expect(body.delivery).toBeTruthy();
  });
});
