import { ICompaniesRepository, ManagerPrisma } from '@/domain/interfaces';

export class CompaniesRepository implements ICompaniesRepository {
  constructor(private readonly prismaManager: ManagerPrisma) {}

  async create(
    data: ICompaniesRepository.CreateCompany,
  ): Promise<ICompaniesRepository.Company> {
    return this.prismaManager.getPrisma().company.create({ data });
  }

  async update({
    id,
    ...data
  }: ICompaniesRepository.UpdateCompany): Promise<void> {
    await this.prismaManager
      .getPrisma()
      .company.update({ data, where: { id } });
  }

  async findByCnpj({
    cnpj,
  }: ICompaniesRepository.FindByCnpj): Promise<ICompaniesRepository.Company | null> {
    return this.prismaManager
      .getPrisma()
      .company.findUnique({ where: { cnpj } });
  }

  async findById({
    id,
  }: ICompaniesRepository.FindById): Promise<ICompaniesRepository.Company | null> {
    return this.prismaManager.getPrisma().company.findUnique({ where: { id } });
  }
}
