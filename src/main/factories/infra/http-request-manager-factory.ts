import { HttpRequest } from '@/domain/interfaces';
import { AxiosManager } from '@/infra/axios';

export const makeHttpRequestManager = (): HttpRequest => {
  return new AxiosManager();
};
