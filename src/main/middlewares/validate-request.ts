import { ZodObject } from 'zod';

import { adaptMiddleware } from '@/main/adapters';
import { makeValidateRequestMiddleware } from '@/main/factories/application/middlewares';

export const validateRequest = (schema: ZodObject<any>) =>
  adaptMiddleware(makeValidateRequestMiddleware(), schema);
