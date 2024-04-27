import { IFindAllUsersCompanyUser } from './find-all-users-company-user';

export namespace ICompanyUser {
  export type CompanyUserServicesNames = 'findAllUsersCompanyUser';

  export type CompanyUserServices = () => IFindAllUsersCompanyUser;
}
