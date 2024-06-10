import { Locals } from '@/application/interfaces';
import { IUsersProfilesRepository } from '@/domain/interfaces';

export interface ICreateUserProfile {
  run(params: ICreateUserProfile.Params): Promise<ICreateUserProfile.Response>;
}

export namespace ICreateUserProfile {
  export type Params = IUsersProfilesRepository.CreateUserProfileService & {
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
