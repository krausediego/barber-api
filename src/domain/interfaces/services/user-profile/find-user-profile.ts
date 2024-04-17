import { Locals } from '@/application/interfaces';
import { IUsersProfilesRepository } from '@/domain/interfaces';

export interface IFindUserProfile {
  run(params: IFindUserProfile.Params): Promise<IFindUserProfile.Response>;
}

export namespace IFindUserProfile {
  export type Params = {
    userId: string;
    traceId?: string;
  };

  export type ParamsService = {
    params: Params;
    locals: Locals;
  };

  export interface Response {
    userProfile: IUsersProfilesRepository.UserProfile;
  }
}
