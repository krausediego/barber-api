import { IUsersProfilesRepository, ManagerPrisma } from '@/domain/interfaces';

export class UsersProfilesRepository implements IUsersProfilesRepository {
  constructor(private readonly prismaManager: ManagerPrisma) {}

  async create(
    data: IUsersProfilesRepository.CreateUserProfile,
  ): Promise<IUsersProfilesRepository.UserProfile> {
    return this.prismaManager.getPrisma().userProfile.create({ data });
  }

  async findByUserId({
    userId,
  }: IUsersProfilesRepository.FindByIdUserId): Promise<IUsersProfilesRepository.FindByUserIdResponse | null> {
    return this.prismaManager.getPrisma().userProfile.findUnique({
      where: { userId },
      include: {
        user: {
          select: {
            email: true,
            role: true,
          },
        },
      },
    });
  }
}
