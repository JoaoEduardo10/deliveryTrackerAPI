import { describe, expect, it, vi } from 'vitest';
import { IXC } from '../../src/app/services/ixc';
import { AxiosMock } from '../mock/axios';
import { IXC_API } from '../../src/app/lib/axios';

describe('ixc/client', () => {
  it('shoudl return client', async () => {
    const ixc = new IXC();

    vi.spyOn(ixc, 'get_client').mockReturnValue(
      Promise.resolve([
        {
          id: '1234',
          razao: 'test',
          endereco: 'rua test',
          email: 'test@interativabr.com.br',
        },
      ]),
    );

    const client = await ixc.get_client({ cpf_cnpj: '046.602.790-20' });

    expect(client[0].id).toBe('1234');
  });

  it('shoudl not return client of adding cpf_cnpj', async () => {
    const ixc = new IXC();

    try {
      const client = await ixc.get_client({ cpf_cnpj: '' });

      expect(client[0].id).not.toBeTruthy();
    } catch (error) {
      expect(error).toBeTruthy();

      expect((error as Error).message).toBe(
        'Não foi possivel buscar o cliente',
      );
    }
  });

  it('should return an error for adding an invalid cpf_cnpj', async () => {
    const ixc = new IXC();

    AxiosMock.requestMock({
      axiosInstance: IXC_API,
      data: {},
      method: 'GET',
      statusCode: 200,
      url: 'cliente',
    });

    try {
      const client = await ixc.get_client({ cpf_cnpj: '046.602.770-20' });

      expect(client[0].id).not.toBeTruthy();
    } catch (error) {
      expect((error as Error).message).toBe(
        'Não foi possivel buscar o cliente',
      );
    }
  });

  it('should update cliente', async () => {
    const ixc = new IXC();

    vi.spyOn(ixc, 'update_client').mockReturnValue(Promise.resolve());

    await ixc.update_client({
      cpf_cnpj: '046.602.770-20',
      email: 'test@gmail.com',
    });
  });
});
