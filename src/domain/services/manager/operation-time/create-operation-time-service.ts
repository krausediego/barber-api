import { ConflictError, NotFoundError } from '@/application/errors';
import { BaseService } from '@/application/helpers';
import {
  ICompaniesRepository,
  ICreateOperationTime,
  IOperationsTimesRepository,
  LoggingManager,
} from '@/domain/interfaces';

export class CreateOperationTimeService
  extends BaseService
  implements ICreateOperationTime
{
  constructor(
    protected readonly logger: LoggingManager,
    private readonly operationTimeRepository: IOperationsTimesRepository,
    private readonly companiesRepository: ICompaniesRepository,
  ) {
    super(logger);
  }

  async run({
    traceId,
    ...props
  }: ICreateOperationTime.Params): Promise<ICreateOperationTime.Response> {
    this.traceId = traceId;

    this.log('info', 'Start process create operation time.');

    this.log('info', 'Find if companyId provided is valid.');

    const company = await this.companiesRepository.findById({
      id: props.companyId,
    });

    if (!company) {
      this.log('warn', 'Company id provided not found in database');
      throw new NotFoundError('Company id provided not found in database.');
    }

    this.log(
      'info',
      'Find companyId provided already exists operation time associate.',
    );

    const operationTimeAlreadyExistsByCompany =
      await this.operationTimeRepository.findByCompanyId({
        companyId: props.companyId,
      });

    if (operationTimeAlreadyExistsByCompany) {
      this.log('info', 'This company already exists operation time.');
      throw new ConflictError('This company already exists operation time.');
    }

    this.log('info', 'Save operation time in database.');

    const operationTime = await this.operationTimeRepository.create({
      ...props,
    });

    this.log('info', 'Finish process.');

    return { operationTime };
  }
}
