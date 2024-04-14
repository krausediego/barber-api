import { UnauthorizedError } from '@/application/errors';
import { BaseService, getHttpError, ok } from '@/application/helpers';
import { Http, Middleware } from '@/application/interfaces';
import { IToken, LoggingManager } from '@/domain/interfaces';

type Params = {
  token: string;
};

export class AuthClientMiddleware extends BaseService implements Middleware {
  constructor(
    protected readonly logger: LoggingManager,
    private readonly token: IToken,
  ) {
    super(logger);
  }

  async handle({ data, locals }: Http.Request<Params>): Promise<Http.Response> {
    try {
      const { traceId } = locals;
      const { token } = data;

      this.traceId = traceId;

      this.log('info', 'Start process validate client token.');

      this.log('info', 'Find token exists.');

      if (!token) {
        this.log('warn', 'Token not provided.');
        throw new UnauthorizedError('Token not provided.');
      }

      this.log('info', 'Token finding, validate token.');

      const tokenValidate = this.token.verifyToken(token);

      if (!tokenValidate) {
        this.log('warn', 'Token is invalid.');
        throw new UnauthorizedError('Token is invalid.');
      }

      return ok({ tokenValidate });
    } catch (error: any) {
      this.log('warn', error);
      return getHttpError(error);
    }
  }
}
