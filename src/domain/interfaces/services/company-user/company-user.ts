import { IFindAllUsersCompanyUser } from '.';

export namespace ICompanyUser {
  export type CompanyUserServicesNames = 'findAllUsersCompanyUser';

  export type CompanyUserServices = () => IFindAllUsersCompanyUser;
}
