import { Locals } from '@/application/interfaces';
import { ICompaniesRepository } from '@/domain/interfaces';

export interface IFindCompany {
  run(params: IFindCompany.Params): Promise<IFindCompany.Response>;
}

export namespace IFindCompany {
  export type Params = {
    companyId: string;
    traceId?: string;
  };

  export type ParamsService = {
    params: Params;
    locals: Locals;
  };

  export type Response = ICompaniesRepository.Company;
}
