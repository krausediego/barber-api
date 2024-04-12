import { IGCPStorage } from '@/domain/interfaces';
import { GCPStorage } from '@/infra/google-cloud';

export const makeGCPStorage = (): IGCPStorage => {
  return new GCPStorage();
};
