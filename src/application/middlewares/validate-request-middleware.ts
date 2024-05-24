import { fromZodError } from 'zod-validation-error';

import { BadRequestError } from '@/application/errors';
import { getHttpError, ok } from '@/application/helpers';
import {
  IValidateMiddleware,
  Http,
  Middleware,
} from '@/application/interfaces';

export class ValidateRequestMiddleware implements Middleware {
  constructor() {}

  async handle(
    request: Http.Request<IValidateMiddleware.Data>,
  ): Promise<Http.Response> {
    const { body, params, query, schema } = request.data;

    try {
      await schema.parse({
        ...body,
        ...params,
        ...query,
      });

      return ok({ validated: true });
    } catch (error: any) {
      const zodError = fromZodError(error);
      return getHttpError(new BadRequestError(zodError.toString()));
    }
  }
}
