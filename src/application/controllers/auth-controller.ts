import { getHttpError, noContent } from '@/application/helpers';
import { Controller, Http } from '@/application/interfaces';
import { IAuth, IAuthSignIn, IAuthSignUp } from '@/domain/interfaces/services';

export class AuthController implements Controller {
  constructor(
    private readonly serviceName: IAuth.AuthServicesNames,
    private readonly service: IAuth.AuthServices,
  ) {}

  async handle({
    data: params,
    locals,
  }: Http.Request<any>): Promise<Http.Response> {
    return this?.[this.serviceName]({ params, locals }).catch((e: any) =>
      getHttpError(e),
    );
  }

  private async authSignIn({
    params,
    locals,
  }: IAuthSignIn.ParamsService): Promise<Http.Response> {
    const { token } = await (this.service() as IAuthSignIn).run({
      ...params,
      traceId: locals?.traceId,
    });

    return noContent({
      name: 'token',
      val: token,
      options: {
        httpOnly: true,
        maxAge: 7 * 864000,
        path: '/',
      },
    });
  }

  private async authSignUp({
    params,
    locals,
  }: IAuthSignUp.ParamsService): Promise<Http.Response> {
    await (this.service() as IAuthSignUp).run({
      ...params,
      traceId: locals?.traceId,
    });

    return noContent();
  }
}
