import { adaptMiddleware } from '@/main/adapters';
import { makeValidateClientRole } from '@/main/factories/application/middlewares';

export const validateRole = adaptMiddleware(makeValidateClientRole());
