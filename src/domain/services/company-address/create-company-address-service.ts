import { ConflictError, NotFoundError } from '@/application/errors';
import { BaseService } from '@/application/helpers';
import {
  ICompaniesAddressesRepository,
  ICompaniesRepository,
  ICreateCompanyAddress,
  LoggingManager,
} from '@/domain/interfaces';

export class CreateCompanyAddressService
  extends BaseService
  implements ICreateCompanyAddress
{
  constructor(
    protected readonly logger: LoggingManager,
    private readonly companiesAddressesRepository: ICompaniesAddressesRepository,
    private readonly companiesRepository: ICompaniesRepository,
  ) {
    super(logger);
  }

  async run(
    params: ICreateCompanyAddress.Params,
  ): Promise<ICreateCompanyAddress.Response> {
    const { traceId, ...data } = params;

    this.traceId = traceId;

    this.log('info', 'Start process create company address.');

    this.log('info', 'Find company by companyId provided.');

    const company = await this.companiesRepository.findById({
      id: data.companyId,
    });

    if (!company) {
      this.log('warn', 'Company id provided not found.');
      throw new NotFoundError('Company id provided not exists.');
    }

    this.log('info', 'Company exists.');

    this.log('info', 'Find if company we have a address already exists.');

    const addressAlreadyExists =
      await this.companiesAddressesRepository.findByCompanyId({
        companyId: data.companyId,
      });

    if (addressAlreadyExists) {
      this.log('warn', 'Company address already exists.');
      throw new ConflictError('Company address already exists.');
    }

    this.log('info', 'Create company address in database.');

    const companyAddress = await this.companiesAddressesRepository.create(data);

    this.log('info', 'Finish process.');

    return { companyAddress };
  }
}
