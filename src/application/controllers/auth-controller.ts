import { getHttpError, noContent, ok } from '@/application/helpers';
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
    const { email, password } = params;

    const { token } = await (this.service() as IAuthSignIn).run({
      email,
      password,
      traceId: locals?.traceId,
    });

    return noContent({
      name: 'token',
      val: token,
      options: {
        httpOnly: true,
        maxAge: 7 * 86400,
        path: '/',
      },
    });
  }

  private async authSignUp({
    params,
    locals,
  }: IAuthSignUp.ParamsService): Promise<Http.Response> {
    const { email, password, role } = params;

    const content = await (this.service() as IAuthSignUp).run({
      email,
      password,
      role,
      traceId: locals?.traceId,
    });

    return ok({ ...content });
  }
}
