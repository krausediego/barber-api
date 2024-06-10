import { NotFoundError } from '@/application/errors';
import { BaseService } from '@/application/helpers';
import {
  ICompaniesRepository,
  IFindCompany,
  LoggingManager,
} from '@/domain/interfaces';

export class FindCompanyService extends BaseService implements IFindCompany {
  constructor(
    protected readonly logger: LoggingManager,
    private readonly companiesRepository: ICompaniesRepository,
  ) {
    super(logger);
  }

  async run({
    companyId,
    traceId,
  }: IFindCompany.Params): Promise<ICompaniesRepository.Company> {
    this.traceId = traceId;

    this.log('info', 'Start process find company.');

    const company = await this.companiesRepository.findById({ id: companyId });

    if (!company) {
      this.log('warn', 'Company not found.');
      throw new NotFoundError('Company not found.');
    }

    this.log('info', 'Finish process.');

    return { ...company };
  }
}
