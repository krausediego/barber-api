import { IUsersRepository } from '../../repositories';

export interface IAuthSignUp {
  run(params: IAuthSignUp.Params): Promise<void>;
}

export namespace IAuthSignUp {
  export type Params = IUsersRepository.CreateUser & {
    traceId?: string;
  };

  export type ParamsService = {
    params: Params;
    locals: any;
  };
}
