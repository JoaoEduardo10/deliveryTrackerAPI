import { Client } from './client/client';
import { IClientParams, IUpdateClientParams } from './client/protocols';

class IXC {
  private client: Client;

  constructor() {
    this.client = new Client();
  }

  async get_client(params: IClientParams) {
    const { cpf_cnpj } = params;

    const client = await this.client.get({ cpf_cnpj });

    return client;
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
