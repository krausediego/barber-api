import { ICreateCompanyAddress } from './create-company-address';

export namespace ICompanyAddress {
  export type CompanyAddressServicesNames = 'createCompanyAddress';

  export type CompanyAddressServices = () => ICreateCompanyAddress;
}
