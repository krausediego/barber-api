import { ConflictError, NotFoundError } from '@/application/errors';
import { BaseService } from '@/application/helpers';
import {
  ICreateUserProfile,
  IManageStorage,
  IUsersProfilesRepository,
  IUsersRepository,
  LoggingManager,
} from '@/domain/interfaces';

export class CreateUserProfileService
  extends BaseService
  implements ICreateUserProfile
{
  constructor(
    protected readonly logger: LoggingManager,
    private readonly usersProfilesRepository: IUsersProfilesRepository,
    private readonly usersRepository: IUsersRepository,
    private readonly storage: IManageStorage,
  ) {
    super(logger);
  }

  async run({
    traceId,
    ...props
  }: ICreateUserProfile.Params): Promise<ICreateUserProfile.Response> {
    this.traceId = traceId;

    this.log('info', 'Start process create user profile.');

    this.log('info', 'Find user by userId provided in database.');

    const user = await this.usersRepository.findByIdUser({ id: props.userId });

    if (!user) {
      this.log('warn', 'User not found by userId provided.');
      throw new NotFoundError('User not found by userId provided.');
    }

    this.log('info', 'Verify user profile has been user exists.');

    const userProfileAlreadyExists =
      await this.usersProfilesRepository.findByUserId({ userId: props.userId });

    if (userProfileAlreadyExists) {
      this.log('warn', 'User profile already exists by user.');
      throw new ConflictError('User profile already exists by user.');
    }

    this.log('info', 'Try send avatar to GCP bucket.');

    const { fileUrl } = await this.storage.upload({
      bucketName: 'users_avatars',
      path: `${new Date().getTime()}_${props.name.replace(/\s/g, '')}_${props.avatar.fileName.replace(/\s/g, '')}`,
      fileBody: props.avatar.buffer,
      contentType: props.avatar.mimetype,
    });

    this.log('info', 'Sending avatar successfully.', { fileUrl });

    this.log('info', 'Save user profile in database.');

    const userProfile = await this.usersProfilesRepository.create({
      name: props.name,
      userId: props.userId,
      avatarUrl: fileUrl,
      specialties:
        typeof props.specialties === 'object'
          ? props.specialties
          : Array(props.specialties),
    });

    this.log('info', 'Finish process.');

    return { userProfile };
  }
}
