import { Locals } from '@/application/interfaces';
import { ICompaniesServicesRepository } from '@/domain/interfaces';

export interface ICreateCompanyService {
  run(
    params: ICreateCompanyService.Params,
  ): Promise<ICreateCompanyService.Response>;
}

export namespace ICreateCompanyService {
  export type Params = ICompaniesServicesRepository.CreateCompanyService & {
    traceId?: string;
  };

  export type ParamsService = {
    params: Params;
    locals: Locals;
  };

  export type Response = {
    companyService: ICompaniesServicesRepository.CompanyService;
  };
}
