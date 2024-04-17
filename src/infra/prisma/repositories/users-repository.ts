import { IUsersRepository, ManagerPrisma } from '@/domain/interfaces';

export class UsersRepository implements IUsersRepository {
  constructor(private readonly prismaManager: ManagerPrisma) {}

  async create(
    data: IUsersRepository.CreateUser,
  ): Promise<IUsersRepository.User> {
    return this.prismaManager.getPrisma().user.create({ data });
  }

  async findByEmail({
    email,
  }: IUsersRepository.FindByEmail): Promise<IUsersRepository.User | null> {
    return this.prismaManager.getPrisma().user.findUnique({ where: { email } });
  }

  async findByIdUser({
    id,
  }: IUsersRepository.FindById): Promise<IUsersRepository.User | null> {
    return this.prismaManager.getPrisma().user.findUnique({ where: { id } });
  }
}
