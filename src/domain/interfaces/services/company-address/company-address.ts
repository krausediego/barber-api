import { ICreateCompanyAddress } from '.';

export namespace ICompanyAddress {
  export type CompanyAddressServicesNames = 'createCompanyAddress';

  export type CompanyAddressServices = () => ICreateCompanyAddress;
}
