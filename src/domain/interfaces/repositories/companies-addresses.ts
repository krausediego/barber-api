export interface ICompaniesAddressesRepository {
  create(
    data: ICompaniesAddressesRepository.CreateCompanyAddress,
  ): Promise<ICompaniesAddressesRepository.CompanyAddress>;
  findByCompanyId(
    data: ICompaniesAddressesRepository.FindByCompanyId,
  ): Promise<ICompaniesAddressesRepository.CompanyAddress | null>;
}

export namespace ICompaniesAddressesRepository {
  export interface CompanyAddress {
    id: string;
    state: string;
    city: string;
    street: string;
    district: string;
    lat: number;
    long: number;
    number: number;
    zipCode: string;
    companyId: string;
    createdAt: Date;
    reference: string | null;
    complement: string | null;
    updatedAt?: Date;
  }

  export interface CreateCompanyAddress {
    state: string;
    city: string;
    street: string;
    district: string;
    lat: number;
    long: number;
    number: number;
    zipCode: string;
    companyId: string;
    reference: string | null;
    complement: string | null;
  }

  export interface FindByCompanyId {
    companyId: string;
  }
}
