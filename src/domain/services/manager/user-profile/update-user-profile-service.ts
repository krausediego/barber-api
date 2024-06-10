import { BadRequestError } from '@/application/errors';
import { BaseService } from '@/application/helpers';
import {
  IManageStorage,
  IUpdateUserProfile,
  IUsersProfilesRepository,
  LoggingManager,
} from '@/domain/interfaces';

export class UpdateUserProfileService
  extends BaseService
  implements IUpdateUserProfile
{
  constructor(
    protected readonly logger: LoggingManager,
    private readonly usersProfilesRepository: IUsersProfilesRepository,
    private readonly storage: IManageStorage,
  ) {
    super(logger);
  }

  async run({
    userId,
    traceId,
    avatar,
    ...props
  }: IUpdateUserProfile.Params): Promise<void> {
    this.traceId = traceId;

    this.log('debug', 'Start process update user profile.');

    const userProfile = await this.usersProfilesRepository.findByUserId({
      userId,
    });

    if (!userProfile) {
      this.log('warn', 'User profile not found');
      throw new BadRequestError('User profile not found');
    }

    let avatarUrl;
    if (avatar) {
      const { fileUrl } = await this.storage.upload({
        bucketName: 'users_avatars',
        path: `${new Date().getTime()}_${props.name?.replace(/\s/g, '')}_${avatar.fileName.replace(/\s/g, '')}`,
        fileBody: avatar.buffer,
        contentType: avatar.mimetype,
      });
      avatarUrl = fileUrl;

      const fileName = userProfile?.avatarUrl.split('/').pop() as string;

      await this.storage.delete({
        bucketName: 'users_avatars',
        fileName: [fileName],
      });
    }

    await this.usersProfilesRepository.update({ ...props, avatarUrl });

    this.log('debug', 'Finish process.');
  }
}
