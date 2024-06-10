import { getHttpError, ok } from '@/application/helpers';
import { Controller, Http } from '@/application/interfaces';
import { HealthCheck } from '@/domain/interfaces';

export class HealthCheckController implements Controller {
  constructor(private readonly healthCheckService: HealthCheck) {}

  async handle({ locals }: Http.Request<any>): Promise<Http.Response> {
    try {
      const content = await this.healthCheckService.run({
        traceId: locals?.traceId,
      });

      return ok({ ...content });
    } catch (error: any) {
      return getHttpError(error);
    }
  }
}
