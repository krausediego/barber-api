import { Locals } from '@/application/interfaces';
import { ICompaniesServicesRepository } from '@/domain/interfaces';

export interface IUpdateCompanyService {
  run(params: IUpdateCompanyService.Params): Promise<void>;
}

export namespace IUpdateCompanyService {
  export type Params = ICompaniesServicesRepository.UpdateCompanyService & {
    traceId?: string;
  };

  export type ParamsService = {
    params: Params;
    locals: Locals;
  };
}
