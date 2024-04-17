export interface ICompaniesUsersRepository {
  create(
    data: ICompaniesUsersRepository.CreateCompanyUser,
  ): Promise<ICompaniesUsersRepository.CompanyUser>;
  findByUserId(
    data: ICompaniesUsersRepository.FindByUserId,
  ): Promise<ICompaniesUsersRepository.CompanyUser | null>;
}

export namespace ICompaniesUsersRepository {
  export interface CompanyUser {
    id: string;
    userId: string;
    companyId: string;
    createdAt: Date;
    updatedAt: Date | null;
  }

  export interface CreateCompanyUser {
    userId: string;
    companyId: string;
  }

  export interface FindByUserId {
    userId: string;
  }
}
