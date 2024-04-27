import { SpecialtyTypes } from '@/domain/interfaces';

export interface ICompaniesUsersRepository {
  create(
    data: ICompaniesUsersRepository.CreateCompanyUser,
  ): Promise<ICompaniesUsersRepository.CompanyUser>;
  findByUserId(
    data: ICompaniesUsersRepository.FindByUserId,
  ): Promise<ICompaniesUsersRepository.CompanyUser | null>;
  findAllByCompanyId(
    data: ICompaniesUsersRepository.FindAllByCompanyId,
  ): Promise<ICompaniesUsersRepository.FindAllByCompanyIdResponse[] | null>;
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

  export interface FindAllByCompanyId {
    userId: string;
    companyId: string;
  }

  export interface FindAllByCompanyIdResponse {
    createdAt: Date;
    user: {
      email: string;
      UserProfile: {
        name: string;
        avatarUrl: string;
        specialties: SpecialtyTypes[];
      } | null;
    };
  }
}
