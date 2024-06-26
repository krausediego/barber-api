import { getHttpError, noContent, ok } from '@/application/helpers';
import { Controller, Http } from '@/application/interfaces';
import {
  IUserProfile,
  ICreateUserProfile,
  IFindUserProfile,
  IUpdateUserProfile,
} from '@/domain/interfaces/services';

export class UserProfileController implements Controller {
  constructor(
    private readonly serviceName: IUserProfile.UserProfileServicesNames,
    private readonly service: IUserProfile.UserProfileServices,
  ) {}

  async handle({
    data: params,
    locals,
  }: Http.Request<any>): Promise<Http.Response> {
    return this?.[this.serviceName]({ params, locals }).catch((e: any) =>
      getHttpError(e),
    );
  }

  private async createUserProfile({
    params,
    locals,
  }: ICreateUserProfile.ParamsService): Promise<Http.Response> {
    const content = await (this.service() as ICreateUserProfile).run({
      ...params,
      userId: locals?.user?.sub as string,
      traceId: locals?.traceId,
    });

    return ok({ ...content });
  }

  private async findUserProfile({
    locals,
  }: IFindUserProfile.ParamsService): Promise<Http.Response> {
    const content = await (this.service() as IFindUserProfile).run({
      userId: locals?.user?.sub as string,
      traceId: locals?.traceId,
    });

    return ok({ ...content });
  }

  private async updateUserProfile({
    params,
    locals,
  }: IUpdateUserProfile.ParamsService): Promise<Http.Response> {
    await (this.service() as IUpdateUserProfile).run({
      ...params,
      userId: locals?.user?.sub as string,
      traceId: locals?.traceId,
    });

    return noContent();
  }
}
