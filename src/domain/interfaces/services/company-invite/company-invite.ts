import { ICreateCompanyInvite } from './create-company-invite';
import { IValidateCompanyInvite } from './validate-company-invite';

export namespace ICompanyInvite {
  export type CompanyInviteServicesNames =
    | 'createCompanyInvite'
    | 'validateCompanyInvite';

  export type CompanyInviteServices = () =>
    | ICreateCompanyInvite
    | IValidateCompanyInvite;
}
