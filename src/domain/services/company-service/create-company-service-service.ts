import { BaseService } from '@/application/helpers';
import {
  ICompaniesServicesRepository,
  LoggingManager,
} from '@/domain/interfaces';
import { ICreateCompanyService } from '@/domain/interfaces/services/company-service';

export class CreateCompanyServiceService
  extends BaseService
  implements ICreateCompanyService
{
  constructor(
    protected readonly logger: LoggingManager,
    private readonly companiesServiceRepository: ICompaniesServicesRepository,
  ) {
    super(logger);
  }

  async run({
    traceId,
    ...params
  }: ICreateCompanyService.Params): Promise<ICreateCompanyService.Response> {
    this.traceId = traceId;

    this.log('debug', 'Start process create company service.');

    const companyService = await this.companiesServiceRepository.create({
      ...params,
    });

    this.log('debug', 'Finish process.');

    return { companyService };
  }
}
