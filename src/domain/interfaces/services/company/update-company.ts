import { Locals } from '@/application/interfaces';
import { ICompaniesRepository } from '@/domain/interfaces';

export interface IUpdateCompany {
  run(params: IUpdateCompany.Params): Promise<void>;
}

export namespace IUpdateCompany {
  export type Params = ICompaniesRepository.UpdateCompanyService & {
    companyId: string;
    traceId?: string;
  };

  export type ParamsService = {
    params: Params;
    locals: Locals;
  };
}
