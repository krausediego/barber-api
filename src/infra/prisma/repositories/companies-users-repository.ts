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

  async findAllByCompanyId({
    userId,
    companyId,
    filters,
  }: ICompaniesUsersRepository.FindAllByCompanyId): Promise<
    ICompaniesUsersRepository.FindAllByCompanyIdResponse[] | null
  > {
    return this.prismaManager.getPrisma().companyUser.findMany({
      where: {
        companyId,
        AND: [
          { NOT: { userId } },
          {
            user: {
              email: { contains: filters?.email, mode: 'insensitive' },
              UserProfile: {
                name: {
                  contains: filters?.name,
                  mode: 'insensitive',
                },
                specialties: filters?.specialties
                  ? { hasEvery: filters?.specialties }
                  : undefined,
              },
            },
          },
        ],
      },
      select: {
        id: true,
        createdAt: true,
        user: {
          select: {
            email: true,
            UserProfile: {
              select: {
                name: true,
                avatarUrl: true,
                specialties: true,
              },
            },
          },
        },
      },
    });
  }

  async findById({
    id,
  }: ICompaniesUsersRepository.FindById): Promise<ICompaniesUsersRepository.CompanyUser | null> {
    return this.prismaManager
      .getPrisma()
      .companyUser.findUnique({ where: { id } });
  }

  async deleteCompanyUser({
    id,
  }: ICompaniesUsersRepository.DeleteCompanyUser): Promise<void> {
    await this.prismaManager.getPrisma().companyUser.delete({ where: { id } });
  }
}
