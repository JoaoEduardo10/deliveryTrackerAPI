/* eslint-disable indent */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosInstance } from 'axios';
import { Internal_Server_Error } from '../errors/api-error';
import { IXC_API } from '../lib/axios';

interface FetchIxcParams {
  url: string;
  method: 'GET' | 'POST' | 'PATH' | 'PUT' | 'DELETE';
  token: string;
  data?: any;
}

class Fetch {
  private axiosIxc: AxiosInstance;
  constructor() {
    this.axiosIxc = IXC_API;
  }

  async ixc<T>({ url, method, token, data }: FetchIxcParams): Promise<T[]> {
    const headers =
      method == 'PUT'
        ? {
            'Content-Type': 'application/json',
            Authorization: 'Basic ' + token,
          }
        : {
            'Content-Type': 'application/json',
            Authorization: 'Basic ' + token,
            ixcsoft: 'listar',
          };

    const response = await this.axiosIxc(url, {
      method,
      headers,
      data,
    });

    const ixc_data: { registros?: T[] } = await response.data;

    if (method != 'PUT' && !ixc_data.registros) {
      throw new Internal_Server_Error(ixc_data as any);
    }

    return ixc_data.registros ?? [];
  }
}

export { Fetch };
