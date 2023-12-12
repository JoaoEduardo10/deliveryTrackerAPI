export interface IClientParams {
  cpf_cnpj: string;
}

export interface IUpdateClientParams {
  telefone_celular?: string;
  telefone_comercial?: string;
  cpf_cnpj: string;
  email: string;
}

export interface ClientDTO {
  id: string;
  razao: string;
  endereco: string;
  email: string;
}

export interface IClient {
  get(params: IClientParams): Promise<ClientDTO[]>;
  update(params: IUpdateClientParams): Promise<void>;
}
