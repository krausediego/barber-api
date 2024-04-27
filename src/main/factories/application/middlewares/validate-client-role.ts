import { Middleware } from '@/application/interfaces';
import { ValidateClientRole } from '@/application/middlewares';
import { makeLogging } from '@/main/factories/infra';

export const makeValidateClientRole = (): Middleware => {
  return new ValidateClientRole(makeLogging());
};
