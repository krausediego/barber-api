import { Locals } from '@/application/interfaces';
import { ICompaniesRepository } from '@/domain/interfaces';

export interface ICreateCompany {
  run(params: ICreateCompany.Params): Promise<ICreateCompany.Response>;
}

export namespace ICreateCompany {
  export type Params = ICompaniesRepository.CreateCompanyService & {
    userId: string;
    traceId?: string;
  };

  export type ParamsService = {
    params: Params;
    locals: Locals;
  };

  export interface Response {
    company: ICompaniesRepository.Company;
    token: string;
  }
}
