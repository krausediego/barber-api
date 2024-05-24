import { BaseService } from '@/application/helpers';
import {
  ICompaniesInvitesRepository,
  IFindAllCompanyInvites,
  LoggingManager,
} from '@/domain/interfaces';

export class FindAllCompanyInvitesService
  extends BaseService
  implements IFindAllCompanyInvites
{
  constructor(
    protected readonly logger: LoggingManager,
    private readonly companiesInvitesRepository: ICompaniesInvitesRepository,
  ) {
    super(logger);
  }

  async run({
    companyId,
    traceId,
  }: IFindAllCompanyInvites.Params): Promise<IFindAllCompanyInvites.Response> {
    this.traceId = traceId;

    this.log('info', 'Start process find all company invites.');

    const companiesInvites =
      await this.companiesInvitesRepository.findAllCompanyInvitesByCompanyId({
        companyId,
      });

    this.log('info', 'Finish process.');

    return { companiesInvites };
  }
}
