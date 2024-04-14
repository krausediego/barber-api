import { adaptMiddleware } from '@/main/adapters';
import { makeAuthClientMiddleware } from '@/main/factories/application/middlewares';

export const authClient = adaptMiddleware(makeAuthClientMiddleware());
