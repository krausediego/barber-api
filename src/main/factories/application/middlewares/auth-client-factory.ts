import { Middleware } from '@/application/interfaces';
import { AuthClientMiddleware } from '@/application/middlewares';
import { makeLogging, makeToken } from '@/main/factories/infra';

export const makeAuthClientMiddleware = (): Middleware => {
  return new AuthClientMiddleware(makeLogging(), makeToken());
};
