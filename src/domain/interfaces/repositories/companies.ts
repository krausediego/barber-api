import { SpecialtyTypes } from '@/domain/interfaces/utils';

export interface ICompaniesRepository {
  create(
    data: ICompaniesRepository.CreateCompany,
  ): Promise<ICompaniesRepository.Company>;
  update(data: ICompaniesRepository.UpdateCompany): Promise<void>;
  findByCnpj(
    data: ICompaniesRepository.FindByCnpj,
  ): Promise<ICompaniesRepository.Company | null>;
  findById(
    data: ICompaniesRepository.FindById,
  ): Promise<ICompaniesRepository.Company | null>;
}

export namespace ICompaniesRepository {
  export interface Company {
    id: string;
    name: string;
    logoUrl: string;
    description: string;
    types: SpecialtyTypes[];
    cnpj: string;
    createdAt: Date;
    updatedAt?: Date;
  }

  export interface CreateCompanyService {
    name: string;
    logo: {
      fileName: string;
      buffer: Buffer;
      mimetype: string;
    };
    description: string;
    types: SpecialtyTypes | SpecialtyTypes[];
    cnpj: string;
  }

  export interface UpdateCompanyService {
    id: string;
    name?: string;
    logo?: {
      fileName: string;
      buffer: Buffer;
      mimetype: string;
    };
    description?: string;
    types?: SpecialtyTypes[];
  }

  export interface UpdateCompany {
    id: string;
    name?: string;
    logoUrl?: string;
    description?: string;
    types?: SpecialtyTypes[];
  }

  export interface CreateCompany {
    name: string;
    logoUrl: string;
    description: string;
    types: SpecialtyTypes[];
    cnpj: string;
  }

  export interface FindByCnpj {
    cnpj: string;
  }

  export interface FindById {
    id: string;
  }
}
