import { adaptMiddleware } from '@/main/adapters';
import { makeTraceMiddleware } from '@/main/factories/application/middlewares';

export const trace = adaptMiddleware(makeTraceMiddleware());
