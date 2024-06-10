import {
  ICreateCompanyInvite,
  IDeleteCompanyInvite,
  IFindAllCompanyInvites,
  IValidateCompanyInvite,
} from '.';

export namespace ICompanyInvite {
  export type CompanyInviteServicesNames =
    | 'createCompanyInvite'
    | 'validateCompanyInvite'
    | 'findAllCompanyInvites'
    | 'deleteCompanyInvite';

  export type CompanyInviteServices = () =>
    | ICreateCompanyInvite
    | IValidateCompanyInvite
    | IFindAllCompanyInvites
    | IDeleteCompanyInvite;
}
