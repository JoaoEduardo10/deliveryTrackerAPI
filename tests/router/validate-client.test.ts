import { beforeEach, describe, expect, it, vi } from 'vitest';
import '../setup';
import { serverTest } from '../setup';
import { createJwt } from '../../src/app/helpers/jsonwebtoken';
import { IXC } from '../../src/app/services/ixc';

describe('validate-client', () => {
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

  it('should return erro for not adding cpf_cnpj in query params', async () => {
    const { body, statusCode } = await serverTest
      .get(`${process.env.VERSION}/delivery`)
      .set('Authorization', `${process.env.TYPE_JWT} ${user.token}`);

    expect(statusCode).toBe(401);
    expect(body).toEqual({ error: 'Adicione o cpf ou cnpj para validação' });
  });

  it('should return erro for not adding invalid cpf_cnpj', async () => {
    vi.spyOn(IXC.prototype, 'get_client').mockReturnValue(
      Promise.resolve('caio no test'),
    );

    const { body, statusCode } = await serverTest
      .get(`${process.env.VERSION}/delivery?cpf_cnpj=091.931.143-22`)
      .set('Authorization', `${process.env.TYPE_JWT} ${user.token}`);

    expect(statusCode).toBe(401);
    expect(body).toEqual({
      error: 'CPF ou CNPJ invalido: caio no test',
    });
  });

  it('should valideted cpf_cnpj', async () => {
    vi.spyOn(IXC.prototype, 'get_client').mockReturnValue(
      Promise.resolve([
        {
          id: '2',
          razao: 'TESTE',
          endereco: 'Rua São Domingos',
          email: 'joaoeduardoj920@gmail.com',
        },
      ]),
    );

    const { body, statusCode } = await serverTest
      .get(`${process.env.VERSION}/delivery?cpf_cnpj=091.931.143-22`)
      .set('Authorization', `${process.env.TYPE_JWT} ${user.token}`);

    expect(statusCode).toBe(200);
    expect(body.client).toBeTruthy();
  });
});
