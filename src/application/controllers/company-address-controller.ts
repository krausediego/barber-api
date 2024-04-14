import { getHttpError, ok } from '@/application/helpers';
import { Controller, Http } from '@/application/interfaces';
import {
  ICompanyAddress,
  ICreateCompanyAddress,
} from '@/domain/interfaces/services';

export class CompanyAddressController implements Controller {
  constructor(
    private readonly serviceName: ICompanyAddress.CompanyAddressServicesNames,
    private readonly service: ICompanyAddress.CompanyAddressServices,
  ) {}

  async handle({
    data: params,
    locals,
  }: Http.Request<any>): Promise<Http.Response> {
    return this?.[this.serviceName]({ params, locals }).catch((e: any) =>
      getHttpError(e),
    );
  }

  private async createCompanyAddress({
    params,
    locals,
  }: ICreateCompanyAddress.ParamsService): Promise<Http.Response> {
    const content = await (this.service() as ICreateCompanyAddress).run({
      traceId: locals?.traceId,
      ...params,
    });

    return ok({ ...content });
  }
}
