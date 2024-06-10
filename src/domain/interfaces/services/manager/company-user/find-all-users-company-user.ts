import { Locals } from '@/application/interfaces';
import { ICompaniesUsersRepository, SpecialtyTypes } from '@/domain/interfaces';

export interface IFindAllUsersCompanyUser {
  run(
    params: IFindAllUsersCompanyUser.Params,
  ): Promise<IFindAllUsersCompanyUser.Response>;
}

export namespace IFindAllUsersCompanyUser {
  export type Params = {
    userId: string;
    companyId: string;
    name?: string;
    email?: string;
    specialties?: SpecialtyTypes[];
    traceId?: string;
  };

  export type ParamsService = {
    params: Params;
    locals: Locals;
  };

  export interface Response {
    users: ICompaniesUsersRepository.FindAllByCompanyIdResponse[] | null;
  }
}
