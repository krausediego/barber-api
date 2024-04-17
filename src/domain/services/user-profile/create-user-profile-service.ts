import { ConflictError, NotFoundError } from '@/application/errors';
import { BaseService } from '@/application/helpers';
import {
  ICreateUserProfile,
  IGCPStorage,
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
    private readonly gcpStorage: IGCPStorage,
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

    const avatarUrl = await this.gcpStorage.uploadFile({
      bucketName: 'barber_api_profile_avatar',
      fileName: `${new Date().getTime()}_${props.avatar.fileName}`,
      buffer: props.avatar.buffer,
      mimetype: props.avatar.mimetype,
    });

    this.log('info', 'Save user profile in database.');

    const userProfile = await this.usersProfilesRepository.create({
      name: props.name,
      userId: props.userId,
      avatarUrl,
      specialties:
        typeof props.specialties === 'object'
          ? props.specialties
          : Array(props.specialties),
    });

    this.log('info', 'Finish process.');

    return { userProfile };
  }
}
