import { NotFoundError } from '@/application/errors';
import { BaseService } from '@/application/helpers';
import {
  IFindUserProfile,
  IUsersProfilesRepository,
  LoggingManager,
} from '@/domain/interfaces';

export class FindUserProfileService
  extends BaseService
  implements IFindUserProfile
{
  constructor(
    protected readonly logger: LoggingManager,
    private readonly usersProfilesRepository: IUsersProfilesRepository,
  ) {
    super(logger);
  }

  async run({
    traceId,
    userId,
  }: IFindUserProfile.Params): Promise<IFindUserProfile.Response> {
    this.traceId = traceId;

    this.log('info', 'Start process find user profile.');

    this.log('info', 'Try to find user profile in database.');

    const userProfile = await this.usersProfilesRepository.findByUserId({
      userId,
    });

    if (!userProfile) {
      this.log('warn', 'User profile not found.');
      throw new NotFoundError('User profile not found.');
    }

    this.log('info', 'Finish process.');

    return { ...userProfile };
  }
}
