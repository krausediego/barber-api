import { getHttpError, noContent, ok } from '@/application/helpers';
import { Controller, Http } from '@/application/interfaces';
import {
  ICompanyUser,
  IDeleteCompanyUser,
  IFindAllUsersCompanyUser,
} from '@/domain/interfaces/services';

export class CompanyUserController implements Controller {
  constructor(
    private readonly serviceName: ICompanyUser.CompanyUserServicesNames,
    private readonly service: ICompanyUser.CompanyUserServices,
  ) {}

  async handle({
    data: params,
    locals,
  }: Http.Request<any>): Promise<Http.Response> {
    return this?.[this.serviceName]({ params, locals }).catch((e: any) =>
      getHttpError(e),
    );
  }

  private async findAllUsersCompanyUser({
    params,
    locals,
  }: IFindAllUsersCompanyUser.ParamsService): Promise<Http.Response> {
    const content = await (this.service() as IFindAllUsersCompanyUser).run({
      ...params,
      userId: locals?.user?.sub as string,
      companyId: locals?.user?.companyId as string,
      traceId: locals?.traceId,
    });

    return ok({ ...content });
  }

  private async deleteCompanyUser({
    params,
    locals,
  }: IDeleteCompanyUser.ParamsService): Promise<Http.Response> {
    await (this.service() as IDeleteCompanyUser).run({
      ...params,
      companyId: locals?.user?.companyId as string,
      traceId: locals?.traceId,
    });

    return noContent();
  }
}
