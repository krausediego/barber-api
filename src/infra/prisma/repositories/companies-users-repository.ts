import { ICompaniesUsersRepository, ManagerPrisma } from '@/domain/interfaces';

export class CompaniesUsersRepository implements ICompaniesUsersRepository {
  constructor(private readonly prismaManager: ManagerPrisma) {}

  async create(
    data: ICompaniesUsersRepository.CreateCompanyUser,
  ): Promise<ICompaniesUsersRepository.CompanyUser> {
    return this.prismaManager.getPrisma().companyUser.create({ data });
  }

  async findByUserId({
    userId,
  }: ICompaniesUsersRepository.FindByUserId): Promise<ICompaniesUsersRepository.CompanyUser | null> {
    return this.prismaManager
      .getPrisma()
      .companyUser.findUnique({ where: { userId } });
  }
}
