import { Locals } from '@/application/interfaces';
import { ICompaniesServicesRepository } from '@/domain/interfaces';

export interface IFindAllCompanyService {
  run(
    params: IFindAllCompanyService.Params,
  ): Promise<IFindAllCompanyService.Response>;
}

export namespace IFindAllCompanyService {
  export type Params = ICompaniesServicesRepository.FindAll & {
    traceId?: string;
  };

  export type ParamsService = {
    params: Params;
    locals: Locals;
  };

  export type Response = {
    companyServices: ICompaniesServicesRepository.CompanyService;
  };
}
