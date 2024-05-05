import { Locals } from '@/application/interfaces';

export interface IAuthSignOut {
  run(params: IAuthSignOut.Params): Promise<void>;
}

export namespace IAuthSignOut {
  export type Params = {
    sub?: string;
    traceId?: string;
  };

  export type ParamsService = {
    params: Params;
    locals: Locals;
  };
}
