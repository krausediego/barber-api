import { ICreateCompany, IFindCompany } from '.';

export namespace ICompany {
  export type CompanyServicesNames = 'createCompany' | 'findCompany';

  export type CompanyServices = () => ICreateCompany | IFindCompany;
}
