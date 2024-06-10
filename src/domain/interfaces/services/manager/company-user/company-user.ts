import { IFindAllUsersCompanyUser, IDeleteCompanyUser } from '.';

export namespace ICompanyUser {
  export type CompanyUserServicesNames =
    | 'findAllUsersCompanyUser'
    | 'deleteCompanyUser';

  export type CompanyUserServices = () =>
    | IFindAllUsersCompanyUser
    | IDeleteCompanyUser;
}
