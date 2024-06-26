import { BadRequestError, ConflictError } from '@/application/errors';
import { BaseService } from '@/application/helpers';
import {
  IAuthSignUp,
  IHashManager,
  IUsersRepository,
  LoggingManager,
} from '@/domain/interfaces';

export class AuthSignUpService extends BaseService implements IAuthSignUp {
  constructor(
    protected readonly logger: LoggingManager,
    private readonly usersRepository: IUsersRepository,
    private readonly hash: IHashManager,
  ) {
    super(logger);
  }

  async run({ traceId, ...props }: IAuthSignUp.Params): Promise<void> {
    this.traceId = traceId;

    this.log('info', 'Start process sign-up.');

    this.log('info', 'Starting the search to see if the user already exists.');

    const userExists = await this.usersRepository.findByEmail({
      email: props.email,
    });

    if (userExists) {
      this.log('warn', 'Email in use, try another or login.');
      throw new ConflictError('Email in use, try another or login.');
    }

    this.log('info', 'Encrypt password.');

    const passwordHash = await this.hash.generateHash(props.password);

    this.log('info', 'Create user in database.');

    const user = await this.usersRepository.create({
      email: props.email,
      password: passwordHash,
      role: props.role,
    });

    if (!user) {
      this.log('warn', 'Error create user in database.');
      throw new BadRequestError('Error create user in database.');
    }

    this.log('debug', 'Finish process sign-up.');
  }
}
