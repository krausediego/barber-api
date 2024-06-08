import { BadRequestError } from '@/application/errors';
import { BaseService } from '@/application/helpers';
import {
  ICompaniesUsersRepository,
  IDeleteCompanyUser,
  LoggingManager,
} from '@/domain/interfaces';

export class DeleteCompanyUserService
  extends BaseService
  implements IDeleteCompanyUser
{
  constructor(
    protected readonly logger: LoggingManager,
    private readonly companyUserRepository: ICompaniesUsersRepository,
  ) {
    super(logger);
  }

  async run({
    id,
    companyId,
    traceId,
  }: IDeleteCompanyUser.Params): Promise<void> {
    this.traceId = traceId;

    this.log('debug', 'Start process delete company user');

    const companyUser = await this.companyUserRepository.findById({ id });

    if (!companyUser) {
      this.log('warn', 'User not found');
      throw new BadRequestError('User not found');
    }

    if (companyUser.companyId !== companyId) {
      this.log('warn', 'Not authorized this operation.');
      throw new BadRequestError('Not authorized this operation.');
    }

    await this.companyUserRepository.deleteCompanyUser({ id });

    this.log('debug', 'Finish process');
  }
}
