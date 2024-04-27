import { BaseService, getHttpError, noContent } from '@/application/helpers';
import { Http, Middleware } from '@/application/interfaces';
import { LoggingManager } from '@/domain/interfaces';

import { UnauthorizedError } from '../errors';

export class ValidateClientRole extends BaseService implements Middleware {
  constructor(protected readonly logger: LoggingManager) {
    super(logger);
  }

  async handle({ locals }: Http.Request<any>): Promise<Http.Response> {
    try {
      this.traceId = locals?.traceId;

      if (locals?.user?.role === 'EMPLOYEE') {
        throw new UnauthorizedError('No have permission this operation.');
      }

      return noContent();
    } catch (error: any) {
      return getHttpError(error);
    }
  }
}
