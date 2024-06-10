import { NotFoundError, ForbiddenError } from '@/application/errors';
import { BaseService } from '@/application/helpers';
import {
  ICompaniesInvitesRepository,
  IDeleteCompanyInvite,
  LoggingManager,
} from '@/domain/interfaces';

export class DeleteCompanyInviteService
  extends BaseService
  implements IDeleteCompanyInvite
{
  constructor(
    protected readonly logger: LoggingManager,
    private readonly companiesInvitesRepository: ICompaniesInvitesRepository,
  ) {
    super(logger);
  }

  async run({
    id,
    companyId,
    traceId,
  }: IDeleteCompanyInvite.Params): Promise<void> {
    this.traceId = traceId;

    this.log('info', 'Start process delete company invite.');

    this.log('info', 'Find company in database');

    const companyInvite = await this.companiesInvitesRepository.findById({
      id,
    });

    if (!companyInvite) {
      this.log('warn', 'Company invite not found.');
      throw new NotFoundError('Company invite not found.');
    }

    if (companyInvite.companyId !== companyId) {
      this.log('warn', 'Not authorized delete this company invite.');
      throw new ForbiddenError('Not authorized delete this company invite.');
    }

    this.log('info', 'Company invite has found.');

    this.log('info', 'Delete company invite');

    await this.companiesInvitesRepository.delete({ id });

    this.log('info', 'Finish process.');
  }
}
