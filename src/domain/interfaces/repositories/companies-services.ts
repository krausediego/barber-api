import { SpecialtyTypes } from '../utils';

export interface ICompaniesServicesRepository {
  create(
    data: ICompaniesServicesRepository.CreateCompanyService,
  ): Promise<ICompaniesServicesRepository.CompanyService>;
  findById(
    data: ICompaniesServicesRepository.FindById,
  ): Promise<ICompaniesServicesRepository.CompanyService | null>;
  findAll(
    data: ICompaniesServicesRepository.FindAll,
  ): Promise<ICompaniesServicesRepository.CompanyService[] | null>;
  update(
    data: ICompaniesServicesRepository.UpdateCompanyService,
  ): Promise<void>;
  delete(
    data: ICompaniesServicesRepository.DeleteCompanyService,
  ): Promise<void>;
}

export namespace ICompaniesServicesRepository {
  export interface CompanyService {
    id: string;
    name: string;
    time: string;
    price: number;
    typeRequired: SpecialtyTypes[];
    companyId: string;
    createdAt: Date;
    updatedAt: Date | null;
  }

  export interface CreateCompanyService {
    name: string;
    time: string;
    price: number;
    typeRequired: SpecialtyTypes[];
    companyId: string;
  }

  export interface FindAll {
    companyId: string;
  }

  export interface FindById {
    id: string;
  }

  export interface UpdateCompanyService {
    id: string;
    name?: string;
    time?: string;
    price?: number;
    typeRequired?: SpecialtyTypes[];
  }

  export interface DeleteCompanyService {
    id: string;
  }
}
