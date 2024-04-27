import { getHttpError, ok } from '@/application/helpers';
import { Controller, Http } from '@/application/interfaces';
import {
  ICompanyInvite,
  ICreateCompanyInvite,
  IValidateCompanyInvite,
} from '@/domain/interfaces/services';

export class CompanyInviteController implements Controller {
  constructor(
    private readonly serviceName: ICompanyInvite.CompanyInviteServicesNames,
    private readonly service: ICompanyInvite.CompanyInviteServices,
  ) {}

  async handle({
    data: params,
    locals,
  }: Http.Request<any>): Promise<Http.Response> {
    return this?.[this.serviceName]({ params, locals }).catch((e: any) =>
      getHttpError(e),
    );
  }

  private async createCompanyInvite({
    params,
    locals,
  }: ICreateCompanyInvite.ParamsService): Promise<Http.Response> {
    const content = await (this.service() as ICreateCompanyInvite).run({
      ...params,
      companyId: locals?.user?.companyId as string,
      traceId: locals?.traceId,
    });

    return ok({ ...content });
  }

  private async validateCompanyInvite({
    params,
    locals,
  }: IValidateCompanyInvite.ParamsService): Promise<Http.Response> {
    const content = await (this.service() as IValidateCompanyInvite).run({
      ...params,
      userId: locals?.user?.sub as string,
      traceId: locals?.traceId,
    });

    return ok({ ...content });
  }
}
