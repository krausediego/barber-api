import { Locals } from '@/application/interfaces';
import { ICompaniesAddressesRepository } from '@/domain/interfaces';

export interface ICreateCompanyAddress {
  run(
    params: ICreateCompanyAddress.Params,
  ): Promise<ICreateCompanyAddress.Response>;
}

export namespace ICreateCompanyAddress {
  export type Params = ICompaniesAddressesRepository.CreateCompanyAddress & {
    traceId?: string;
  };

  export type ParamsService = {
    params: Params;
    locals: Locals;
  };

  export interface Response {
    companyAddress: ICompaniesAddressesRepository.CompanyAddress;
  }
}
