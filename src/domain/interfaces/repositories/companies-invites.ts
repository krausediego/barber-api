export interface ICompaniesInvitesRepository {
  create(
    data: ICompaniesInvitesRepository.CreateCompanyInviteUser,
  ): Promise<ICompaniesInvitesRepository.CompanyInvite>;
  findByCode(
    data: ICompaniesInvitesRepository.FindByCode,
  ): Promise<ICompaniesInvitesRepository.CompanyInvite | null>;
  delete(data: ICompaniesInvitesRepository.Delete): Promise<void>;
  countByCompanyId(
    data: ICompaniesInvitesRepository.CountByCompanyId,
  ): Promise<number | null>;
  findAllCompanyInvitesByCompanyId(
    data: ICompaniesInvitesRepository.FindAllCompanyInvitesByCompanyId,
  ): Promise<ICompaniesInvitesRepository.CompanyInvite[] | null>;
  findById(
    data: ICompaniesInvitesRepository.FindById,
  ): Promise<ICompaniesInvitesRepository.CompanyInvite | null>;
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

  export interface CountByCompanyId {
    companyId: string;
  }

  export interface FindAllCompanyInvitesByCompanyId {
    companyId: string;
  }

  export interface FindById {
    id: string;
  }

  export interface Delete {
    id: string;
  }
}
