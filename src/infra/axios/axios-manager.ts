import axios from 'axios';

import { HttpRequest } from '@/domain/interfaces/http';

type Get = HttpRequest.Get;
type Post = HttpRequest.Post;
type Put = HttpRequest.Put;
type Delete = HttpRequest.Delete;

export class AxiosManager implements HttpRequest {
  async get({ url, headers }: Get): Promise<any> {
    const result = await axios.get(url, { headers });
    return result.data;
  }

  async post({ url, headers, data }: Post): Promise<any> {
    const result = await axios.post(url, data, { headers });
    return result.data;
  }

  async put({ url, headers, data }: Put): Promise<any> {
    const result = await axios.put(url, data, { headers });
    return result.data;
  }

  async delete({ url, headers }: Delete): Promise<any> {
    const result = await axios.delete(url, { headers });
    return result.data;
  }
}
