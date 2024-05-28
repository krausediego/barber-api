import { Locals } from '@/application/interfaces';
import { ICompaniesInvitesRepository } from '@/domain/interfaces';

export interface ICreateCompanyInvite {
  run(
    params: ICreateCompanyInvite.Params,
  ): Promise<ICreateCompanyInvite.Response>;
}

export namespace ICreateCompanyInvite {
  export type Params = ICompaniesInvitesRepository.CreateCompanyInviteUser & {
    traceId?: string;
  };

  export type ParamsService = {
    params: Params;
    locals: Locals;
  };

  export type Response = ICompaniesInvitesRepository.CompanyInvite;
}
