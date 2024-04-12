import { ICompaniesRepository } from '@/domain/interfaces';

export interface ICreateCompany {
  run(params: ICreateCompany.Params): Promise<ICreateCompany.Reponse>;
}

export namespace ICreateCompany {
  export type Params = ICompaniesRepository.CreateCompanyService & {
    traceId?: string;
  };

  export type ParamsService = {
    params: Params;
    locals: any;
  };

  export interface Reponse {
    company: ICompaniesRepository.Company;
  }
}
