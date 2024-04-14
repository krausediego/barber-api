import {
  ICompaniesAddressesRepository,
  ManagerPrisma,
} from '@/domain/interfaces';

export class CompaniesAddressesRepository
  implements ICompaniesAddressesRepository
{
  constructor(private readonly prismaManager: ManagerPrisma) {}

  async create(
    data: ICompaniesAddressesRepository.CreateCompanyAddress,
  ): Promise<ICompaniesAddressesRepository.CompanyAddress> {
    return this.prismaManager.getPrisma().companyAddress.create({ data });
  }

  async findByCompanyId({
    companyId,
  }: ICompaniesAddressesRepository.FindByCompanyId): Promise<ICompaniesAddressesRepository.CompanyAddress | null> {
    return this.prismaManager
      .getPrisma()
      .companyAddress.findUnique({ where: { companyId } });
  }
}
