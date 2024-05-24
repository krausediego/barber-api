import {
  ICompaniesInvitesRepository,
  ManagerPrisma,
} from '@/domain/interfaces';

export class CompaniesInvitesRepository implements ICompaniesInvitesRepository {
  constructor(private readonly prismaManager: ManagerPrisma) {}

  async create(
    data: ICompaniesInvitesRepository.CreateCompanyInviteUser,
  ): Promise<ICompaniesInvitesRepository.CompanyInvite> {
    return this.prismaManager.getPrisma().companyInvites.create({ data });
  }

  async findByCode({
    code,
  }: ICompaniesInvitesRepository.FindByCode): Promise<ICompaniesInvitesRepository.CompanyInvite | null> {
    return this.prismaManager
      .getPrisma()
      .companyInvites.findFirst({ where: { code } });
  }

  async delete({ id }: ICompaniesInvitesRepository.Delete): Promise<void> {
    await this.prismaManager
      .getPrisma()
      .companyInvites.delete({ where: { id } });
  }

  async countByCompanyId({
    companyId,
  }: ICompaniesInvitesRepository.CountByCompanyId): Promise<number> {
    return this.prismaManager
      .getPrisma()
      .companyInvites.count({ where: { companyId } });
  }

  async findAllCompanyInvitesByCompanyId({
    companyId,
  }: ICompaniesInvitesRepository.FindAllCompanyInvitesByCompanyId): Promise<
    ICompaniesInvitesRepository.CompanyInvite[] | null
  > {
    return this.prismaManager
      .getPrisma()
      .companyInvites.findMany({ where: { companyId } });
  }

  async findById({
    id,
  }: ICompaniesInvitesRepository.FindById): Promise<ICompaniesInvitesRepository.CompanyInvite | null> {
    return this.prismaManager
      .getPrisma()
      .companyInvites.findUnique({ where: { id } });
  }
}
