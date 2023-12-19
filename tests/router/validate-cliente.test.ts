import { beforeEach, describe, expect, it, vi } from 'vitest';
import { serverTest } from '../setup';
import { IXC } from '../../src/app/services/ixc';
import { createJwt } from '../../src/app/helpers/jsonwebtoken';

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

  it('should validate client', async () => {
    vi.spyOn(IXC.prototype, 'get_client').mockReturnValue(
      Promise.resolve([
        {
          id: '1234',
          razao: 'test',
          endereco: 'rua test',
          email: 'test@interativabr.com.br',
        },
      ]),
    );

    const { body, statusCode } = await serverTest
      .get(`${process.env.VERSION}/delivery?cpf_cnpj=091.931.143-22`)
      .set('Authorization', `${process.env.TYPE_JWT} ${user.token}`);

    expect(statusCode).toBe(200);
    expect(body.client).toBeTruthy();
  });

  it('should not validate the user for not adding the cpf_cnpj', async () => {
    vi.spyOn(IXC.prototype, 'get_client').mockReturnValue(
      Promise.resolve([
        {
          id: '1234',
          razao: 'test',
          endereco: 'rua test',
          email: 'test@interativabr.com.br',
        },
      ]),
    );

    const { body, statusCode } = await serverTest
      .get(`${process.env.VERSION}/delivery`)
      .set('Authorization', `${process.env.TYPE_JWT} ${user.token}`);

    expect(statusCode).toBe(400);
    expect(body).toEqual({ error: 'Não foi possivel busca o cliente' });
  });

  it('should returns an ero by not finding the user', async () => {
    vi.spyOn(IXC.prototype, 'get_client').mockReturnValue(
      Promise.resolve('caio no error'),
    );

    const { body, statusCode } = await serverTest
      .get(`${process.env.VERSION}/delivery?cpf_cnpj=098.980.999-00`)
      .set('Authorization', `${process.env.TYPE_JWT} ${user.token}`);

    expect(statusCode).toBe(401);
    expect(body).toEqual({ error: 'Cliente invalido' });
  });
});
