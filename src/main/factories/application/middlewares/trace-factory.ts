import { Middleware } from '@/application/interfaces';
import { TraceMiddleware } from '@/application/middlewares';
import { makeHash, makeLogging } from '@/main/factories/infra';

export const makeTraceMiddleware = (): Middleware => {
  return new TraceMiddleware(makeHash(), makeLogging());
};
