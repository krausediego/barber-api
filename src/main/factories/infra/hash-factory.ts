import { IHashManager } from '@/domain/interfaces';
import { HashManager } from '@/infra/hash';

export const makeHash = (): IHashManager => {
  return new HashManager();
};
