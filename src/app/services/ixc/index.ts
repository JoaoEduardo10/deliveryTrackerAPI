/* eslint-disable @typescript-eslint/no-explicit-any */
import { Client } from './client/client';
import { IClientParams, IUpdateClientParams } from './client/protocols';

class IXC {
  private client: Client;

  constructor() {
    this.client = new Client();
  }

  async get_client(params: IClientParams) {
    const { cpf_cnpj } = params;

    try {
      const client = await this.client.get({ cpf_cnpj });

      return client;
    } catch (error: any) {
      return error.message as string;
    }
  }

  async update_client(params: IUpdateClientParams) {
    const { cpf_cnpj, email, telefone_celular, telefone_comercial } = params;

    await this.client.update({
      cpf_cnpj,
      email,
      telefone_celular,
      telefone_comercial,
    });
  }
}

export { IXC };
