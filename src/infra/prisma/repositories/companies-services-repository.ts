import {
  ICompaniesServicesRepository,
  ManagerPrisma,
} from '@/domain/interfaces';

export class CompaniesServicesRepository
  implements ICompaniesServicesRepository
{
  constructor(private readonly prismaManager: ManagerPrisma) {}

  async create(
    data: ICompaniesServicesRepository.CreateCompanyService,
  ): Promise<ICompaniesServicesRepository.CompanyService> {
    return this.prismaManager.getPrisma().companyService.create({ data });
  }

  async findById({
    id,
  }: ICompaniesServicesRepository.FindById): Promise<ICompaniesServicesRepository.CompanyService | null> {
    return this.prismaManager
      .getPrisma()
      .companyService.findUnique({ where: { id } });
  }

  async findAll({
    companyId,
  }: ICompaniesServicesRepository.FindAll): Promise<
    ICompaniesServicesRepository.CompanyService[] | null
  > {
    return this.prismaManager
      .getPrisma()
      .companyService.findMany({ where: { companyId } });
  }

  async update({
    id,
    ...data
  }: ICompaniesServicesRepository.UpdateCompanyService): Promise<void> {
    await this.prismaManager
      .getPrisma()
      .companyService.update({ data, where: { id } });
  }

  async delete({
    id,
  }: ICompaniesServicesRepository.DeleteCompanyService): Promise<void> {
    await this.prismaManager
      .getPrisma()
      .companyService.delete({ where: { id } });
  }
}
