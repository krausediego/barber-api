import { UnauthorizedError } from '@/application/errors';
import { BaseService } from '@/application/helpers';
import {
  IUsersRepository,
  LoggingManager,
  IHashManager,
  IToken,
  ICompaniesUsersRepository,
} from '@/domain/interfaces';
import { IAuthSignIn } from '@/domain/interfaces/services/auth';

export class AuthSignInService extends BaseService implements IAuthSignIn {
  constructor(
    protected readonly logger: LoggingManager,
    private readonly usersRepository: IUsersRepository,
    private readonly companiesUsersRepository: ICompaniesUsersRepository,
    private readonly hashManager: IHashManager,
    private readonly token: IToken,
  ) {
    super(logger);
  }

  async run({
    traceId,
    ...props
  }: IAuthSignIn.Params): Promise<IAuthSignIn.Response> {
    this.traceId = traceId;

    this.log('debug', 'Start process sign-in.');

    this.log('debug', 'Find user by email.');

    const userExists = await this.usersRepository.findByEmail({
      email: props.email,
    });

    if (!userExists) {
      this.log('warn', 'Email or password is invalid');
      throw new UnauthorizedError('Email or password is invalid');
    }

    this.log('debug', 'Check password is valid.');

    const userCredentials = await this.hashManager.compareHash(
      props.password,
      userExists.password,
    );

    if (!userCredentials) {
      this.log('warn', 'Email or password is invalid');
      throw new UnauthorizedError('Email or password is invalid');
    }

    this.log('info', 'Find company with user');

    const companyWithUser = await this.companiesUsersRepository.findByUserId({
      userId: userExists.id,
    });

    if (!companyWithUser) {
      this.log('debug', 'User not found in company users.');
    }

    this.log('debug', 'Generate token, and return to client requested.');

    const token = this.token.generateToken(userExists.id, {
      companyId: companyWithUser?.companyId ?? undefined,
      role: userExists.role,
    });

    this.log('debug', 'Finish process sign-in.');

    return { token };
  }
}
