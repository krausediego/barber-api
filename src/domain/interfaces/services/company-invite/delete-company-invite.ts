import { Locals } from '@/application/interfaces';

export interface IDeleteCompanyInvite {
  run(params: IDeleteCompanyInvite.Params): Promise<void>;
}

export namespace IDeleteCompanyInvite {
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
