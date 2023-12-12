/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ClientDTO,
  IClient,
  IClientParams,
  IUpdateClientParams,
} from './protocols';
import { Internal_Server_Error } from '../../../errors/api-error';
import { Fetch } from '../../../helpers/fetchData';

class Client implements IClient {
  private token: string;
  private fetch: Fetch;

  constructor() {
    this.token = `${process.env.IXC_TOKEN}`;
    this.fetch = new Fetch();
  }

  async get(params: IClientParams): Promise<ClientDTO[]> {
    const { cpf_cnpj } = params;

    if (!cpf_cnpj) {
      throw new Internal_Server_Error('Não foi possivel buscar o cliente');
    }

    const registros = await this.fetch.ixc<ClientDTO>({
      url: 'cliente',
      method: 'GET',
      token: this.token,
      data: {
        qtype: 'cliente.cnpj_cpf',
        query: `${cpf_cnpj}`,
        oper: '=',
        page: '1',
        rp: '1000',
        sortname: '',
        sortorder: 'asc',
      },
    });

    if (!registros) {
      throw new Internal_Server_Error('Não foi possivel buscar o cliente');
    }

    const cliente = registros.map(
      ({ id, razao, endereco, email }: ClientDTO) => ({
        id,
        razao,
        endereco,
        email,
      }),
    );

    return cliente;
  }

  async update(params: IUpdateClientParams): Promise<void> {
    const { cpf_cnpj, telefone_celular, telefone_comercial, email } = params;

    if (!cpf_cnpj) {
      throw new Internal_Server_Error(
        'Não foi posssivel atualizar os dados do usuário',
      );
    }

    const [client] = await this.fetch.ixc<any>({
      url: 'cliente',
      method: 'GET',
      token: this.token,
      data: {
        qtype: 'cliente.cnpj_cpf',
        query: `${cpf_cnpj}`,
        oper: '=',
        page: '1',
        rp: '1000',
        sortname: '',
        sortorder: 'asc',
      },
    });

    await this.fetch.ixc({
      url: `cliente/${client.id}`,
      method: 'PUT',
      token: this.token,
      data: {
        ...client,
        telefone_celular: telefone_celular ?? client.telefone_celular,
        telefone_comercial: telefone_comercial ?? client.telefone_comercial,
        fone: telefone_celular || telefone_comercial || client.telefone_celular,
        whatsapp: telefone_celular ?? client.telefone_celular,
        email: email ?? client.email,
      },
    });
  }
}

export { Client };
