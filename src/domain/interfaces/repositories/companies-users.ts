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
  findById(
    data: ICompaniesUsersRepository.FindById,
  ): Promise<ICompaniesUsersRepository.CompanyUser | null>;
  deleteCompanyUser(
    data: ICompaniesUsersRepository.DeleteCompanyUser,
  ): Promise<void>;
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

  export interface DeleteCompanyUser {
    id: string;
  }

  export interface FindById {
    id: string;
  }

  export interface FindAllByCompanyId {
    userId: string;
    companyId: string;
    filters?: {
      name?: string;
      email?: string;
      specialties?: SpecialtyTypes[];
    };
  }

  export interface FindAllByCompanyIdResponse {
    id: string;
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
