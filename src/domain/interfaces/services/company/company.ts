import { ICreateCompany } from './create-company';

export namespace ICompany {
  export type CompanyServicesNames = 'createCompany';

  export type CompanyServices = () => ICreateCompany;
}
