import {
  ICreateCompanyService,
  IFindAllCompanyService,
  IUpdateCompanyService,
  IDeleteCompanyService,
} from '.';

export namespace ICompanyService {
  export type CompanyServiceServicesNames =
    | 'createCompanyService'
    | 'updateCompanyService'
    | 'findAllCompanyServices'
    | 'deleteCompanyService';

  export type CompanyServiceServices = () =>
    | ICreateCompanyService
    | IFindAllCompanyService
    | IUpdateCompanyService
    | IDeleteCompanyService;
}
