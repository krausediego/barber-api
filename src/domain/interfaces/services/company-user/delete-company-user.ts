import { Locals } from '@/application/interfaces';

export interface IDeleteCompanyUser {
  run(params: IDeleteCompanyUser.Params): Promise<void>;
}

export namespace IDeleteCompanyUser {
  export type Params = {
    id: string;
    companyId: string;
    traceId?: string;
  };

  export type ParamsService = {
    params: Params;
    locals: Locals;
  };
}
