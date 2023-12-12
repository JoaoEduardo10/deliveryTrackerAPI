/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosInstance } from 'axios';
import MockAdapter from 'axios-mock-adapter';

interface AxiosMockParams {
  url: string;
  statusCode: number;
  data: any;
  axiosInstance: AxiosInstance;
  method: 'GET' | 'POST' | 'PATH' | 'PUT' | 'DELETE';
}

class AxiosMock {
  static requestMock({
    data,
    statusCode,
    url,
    axiosInstance,
    method,
  }: AxiosMockParams) {
    const mock = new MockAdapter(axiosInstance);

    if (method == 'GET') {
      mock.onGet(url).replyOnce(statusCode, data);
    }

    if (method == 'PUT') {
      mock.onPut(url).replyOnce(statusCode, data);
    }

    if (method == 'DELETE') {
      mock.onDelete(url).replyOnce(statusCode, data);
    }

    mock.onPatch(url).replyOnce(statusCode, data);
  }
}

export { AxiosMock };
