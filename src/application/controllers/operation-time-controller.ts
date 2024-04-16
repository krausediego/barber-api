import { getHttpError, ok } from '@/application/helpers';
import { Controller, Http } from '@/application/interfaces';
import {
  IOperationTime,
  ICreateOperationTime,
} from '@/domain/interfaces/services';

export class OperationTimeController implements Controller {
  constructor(
    private readonly serviceName: IOperationTime.OperationTimeServicesNames,
    private readonly service: IOperationTime.OperationTimeServices,
  ) {}

  async handle({
    data: params,
    locals,
  }: Http.Request<any>): Promise<Http.Response> {
    return this?.[this.serviceName]({ params, locals }).catch((e: any) =>
      getHttpError(e),
    );
  }

  private async createOperationTime({
    params,
    locals,
  }: ICreateOperationTime.ParamsService): Promise<Http.Response> {
    const content = await (this.service() as ICreateOperationTime).run({
      traceId: locals?.traceId,
      ...params,
    });

    return ok({ ...content });
  }
}
