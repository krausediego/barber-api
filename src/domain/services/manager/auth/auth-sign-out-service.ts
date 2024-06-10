import { BadRequestError } from '@/application/errors';
import { BaseService } from '@/application/helpers';
import { IAuthSignOut, LoggingManager } from '@/domain/interfaces';

export class AuthSignOutService extends BaseService implements IAuthSignOut {
  constructor(protected readonly logger: LoggingManager) {
    super(logger);
  }

  async run({ sub, traceId }: IAuthSignOut.Params): Promise<void> {
    this.traceId = traceId;

    this.log('debug', 'Start process sign-out.');

    if (!sub) {
      this.log('warn', 'User not logged.');
      throw new BadRequestError('User not logged.');
    }

    this.log('debug', 'Finish process sign-out.');
  }
}
