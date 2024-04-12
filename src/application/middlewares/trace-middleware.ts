import { ok } from '@/application/helpers';
import { Http, Middleware } from '@/application/interfaces';
import { LoggingManager, IHashManager } from '@/domain/interfaces';

export class TraceMiddleware implements Middleware {
  constructor(
    private readonly hash: IHashManager,
    private readonly logger: LoggingManager,
  ) {}

  async handle({ method, path }: Http.Request<any>): Promise<Http.Response> {
    const traceId = this.hash.generateRandomHash();
    this.logger.info({ method, path, traceId }, `${method} ${path}`);
    return ok({ traceId });
  }
}
