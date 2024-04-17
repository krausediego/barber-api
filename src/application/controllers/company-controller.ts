import { getHttpError, ok } from '@/application/helpers';
import { Controller, Http } from '@/application/interfaces';
import { ICompany, ICreateCompany } from '@/domain/interfaces/services';

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
}
