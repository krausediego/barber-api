export interface ICompaniesInvitesRepository {
  create(
    data: ICompaniesInvitesRepository.CreateCompanyInviteUser,
  ): Promise<ICompaniesInvitesRepository.CompanyInvite>;
  findByCode(
    data: ICompaniesInvitesRepository.FindByCode,
  ): Promise<ICompaniesInvitesRepository.CompanyInvite | null>;
  delete(data: ICompaniesInvitesRepository.Delete): Promise<void>;
}

export namespace ICompaniesInvitesRepository {
  export interface CompanyInvite {
    id: string;
    code: string;
    companyId: string;
    createdAt: Date;
    updatedAt: Date | null;
  }

  export interface CreateCompanyInviteUser {
    code: string;
    companyId: string;
  }

  export interface FindByCode {
    code: string;
  }

  export interface Delete {
    id: string;
  }
}
