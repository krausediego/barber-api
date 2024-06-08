import { Locals } from '@/application/interfaces';
import { ICompaniesServicesRepository } from '@/domain/interfaces';

export interface IDeleteCompanyService {
  run(params: IDeleteCompanyService.Params): Promise<void>;
}

export namespace IDeleteCompanyService {
  export type Params = ICompaniesServicesRepository.DeleteCompanyService & {
    traceId?: string;
  };

  export type ParamsService = {
    params: Params;
    locals: Locals;
  };
}
