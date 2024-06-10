import { Locals } from '@/application/interfaces';

import { IUsersProfilesRepository } from '../../../repositories';

export interface IUpdateUserProfile {
  run(params: IUpdateUserProfile.Params): Promise<void>;
}

export namespace IUpdateUserProfile {
  export type Params = IUsersProfilesRepository.UpdateProfileService & {
    userId: string;
    traceId?: string;
  };

  export type ParamsService = {
    params: Params;
    locals: Locals;
  };
}
