import { Locals } from '@/application/interfaces';

export interface IValidateCompanyInvite {
  run(
    params: IValidateCompanyInvite.Params,
  ): Promise<IValidateCompanyInvite.Response>;
}

export namespace IValidateCompanyInvite {
  export type Params = {
    code: string;
    userId: string;
    traceId?: string;
  };

  export type ParamsService = {
    params: Params;
    locals: Locals;
  };

  export interface Response {
    message: string;
  }
}
