import { Locals } from '@/application/interfaces';
import { ICompaniesInvitesRepository } from '@/domain/interfaces';

export interface IFindAllCompanyInvites {
  run(
    params: IFindAllCompanyInvites.Params,
  ): Promise<IFindAllCompanyInvites.Response>;
}

export namespace IFindAllCompanyInvites {
  export type Params = {
    companyId: string;
    traceId?: string;
  };

  export type ParamsService = {
    params: Params;
    locals: Locals;
  };

  export type Response = {
    companyInvites: ICompaniesInvitesRepository.CompanyInvite[] | null;
  };
}
