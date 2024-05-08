import { getHttpError, noContent, ok } from '@/application/helpers';
import { Controller, Http } from '@/application/interfaces';
import {
  ICompany,
  ICreateCompany,
  IFindCompany,
  IUpdateCompany,
} from '@/domain/interfaces/services';

export class CompanyController implements Controller {
  constructor(
    private readonly serviceName: ICompany.CompanyServicesNames,
    private readonly service: ICompany.CompanyServices,
  ) {}

  async handle({
    data: params,
    locals,
  }: Http.Request<any>): Promise<Http.Response> {
    return this?.[this.serviceName]({ params, locals }).catch((e: any) =>
      getHttpError(e),
    );
  }

  private async createCompany({
    params,
    locals,
  }: ICreateCompany.ParamsService): Promise<Http.Response> {
    const { company, token } = await (this.service() as ICreateCompany).run({
      ...params,
      userId: locals?.user?.sub as string,
      traceId: locals?.traceId,
    });

    return ok(
      { company },
      {
        name: 'token',
        val: token,
        options: {
          httpOnly: true,
          maxAge: 7 * 86400000,
          path: '/',
        },
      },
      'token',
    );
  }

  private async updateCompany({
    params,
    locals,
  }: IUpdateCompany.ParamsService): Promise<Http.Response> {
    console.log('chegou no update', params);
    await (this.service() as IUpdateCompany).run({
      ...params,
      traceId: locals.traceId,
      companyId: locals?.user?.companyId as string,
    });

    return noContent();
  }

  private async findCompany({
    locals,
  }: IFindCompany.ParamsService): Promise<Http.Response> {
    const company = await (this.service() as IFindCompany).run({
      companyId: locals?.user?.companyId as string,
      traceId: locals.traceId,
    });

    return ok({ ...company });
  }
}
