import { ICreateCompany, IFindCompany, IUpdateCompany } from '.';

export namespace ICompany {
  export type CompanyServicesNames =
    | 'createCompany'
    | 'findCompany'
    | 'updateCompany';

  export type CompanyServices = () =>
    | ICreateCompany
    | IFindCompany
    | IUpdateCompany;
}
