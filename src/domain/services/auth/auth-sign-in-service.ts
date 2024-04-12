import { UnauthorizedError } from '@/application/errors';
import { BaseService } from '@/application/helpers';
import {
  IUsersRepository,
  LoggingManager,
  IHashManager,
  IToken,
} from '@/domain/interfaces';
import { IAuthSignIn } from '@/domain/interfaces/services/auth';

export class AuthSignInService extends BaseService implements IAuthSignIn {
  constructor(
    protected readonly logger: LoggingManager,
    private readonly usersRepository: IUsersRepository,
    private readonly hashManager: IHashManager,
    private readonly token: IToken,
  ) {
    super(logger);
  }

  async run({
    traceId,
    ...params
  }: IAuthSignIn.Params): Promise<IAuthSignIn.Reponse> {
    this.traceId = traceId;

    this.log('debug', 'Start process sign-in.');

    this.log('debug', 'Find user by email.');

    const userExists = await this.usersRepository.findByEmail({
      email: params.email,
    });

    if (!userExists) {
      this.log('warn', 'Email or password is invalid');
      throw new UnauthorizedError('Email or password is invalid');
    }

    this.log('debug', 'Check password is valid.');

    const userCredentials = await this.hashManager.compareHash(
      params.password,
      userExists.password,
    );

    if (!userCredentials) {
      this.log('warn', 'Email or password is invalid');
      throw new UnauthorizedError('Email or password is invalid');
    }

    this.log('debug', 'Generate token, and return to client requested.');

    const token = this.token.generateToken('a');

    this.log('debug', 'Finish process sign-in.');

    return { token };
  }
}
