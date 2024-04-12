import { BadRequestError, ConflictError } from '@/application/errors';
import { BaseService } from '@/application/helpers';
import {
  IAuthSignUp,
  IHashManager,
  IToken,
  IUsersRepository,
  LoggingManager,
} from '@/domain/interfaces';

export class AuthSignUpService extends BaseService implements IAuthSignUp {
  constructor(
    protected readonly logger: LoggingManager,
    private readonly usersRepository: IUsersRepository,
    private readonly hash: IHashManager,
    private readonly token: IToken,
  ) {
    super(logger);
  }

  async run(params: IAuthSignUp.Params): Promise<IAuthSignUp.Reponse> {
    const { email, password, role, traceId } = params;

    this.traceId = traceId;

    this.log('info', 'Start process sign-up.');

    this.log('info', 'Starting the search to see if the user already exists.');

    const userExists = await this.usersRepository.findByEmail({ email });

    if (userExists) {
      this.log('warn', 'Email in use, try another or login.');
      throw new ConflictError('Email in use, try another or login.');
    }

    this.log('info', 'Encrypt password.');

    const passwordHash = await this.hash.generateHash(password);

    this.log('info', 'Create user in database.');

    const user = await this.usersRepository.create({
      email,
      password: passwordHash,
      role,
    });

    if (!user) {
      this.log('warn', 'Error create user in database.');
      throw new BadRequestError('Error create user in database.');
    }

    this.log('debug', 'Generate token, and return to client requested.');

    const token = this.token.generateToken(user.id, { role: user.role });

    this.log('debug', 'Finish process sign-up.');

    return { token };
  }
}
