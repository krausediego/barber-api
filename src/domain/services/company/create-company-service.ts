import { ConflictError } from '@/application/errors';
import { BaseService } from '@/application/helpers';
import {
  ICompaniesRepository,
  ICreateCompany,
  IGCPStorage,
  LoggingManager,
} from '@/domain/interfaces';

export class CreateCompanyService
  extends BaseService
  implements ICreateCompany
{
  constructor(
    protected readonly logger: LoggingManager,
    private readonly companiesRepository: ICompaniesRepository,
    private readonly gcpStorage: IGCPStorage,
  ) {
    super(logger);
  }

  async run({
    traceId,
    ...props
  }: ICreateCompany.Params): Promise<ICreateCompany.Response> {
    const { fileName, buffer, mimetype } = props.logo;

    this.traceId = traceId;

    this.log('info', 'Start process create company.');

    this.log('info', 'Find company already exists.');

    const companyExists = await this.companiesRepository.findByCnpj({
      cnpj: props.cnpj,
    });

    if (companyExists) {
      this.log('warn', 'Company already exists.');
      throw new ConflictError('Company already exists.');
    }

    this.log('info', 'Sending logo to GCP bucket.');

    const logoUrl = await this.gcpStorage.uploadFile({
      bucketName: 'barber_api_companies_logos',
      fileName: `${new Date().getTime()}_${fileName}`,
      buffer,
      mimetype,
    });

    this.log('info', 'Sending logo successfully.', { logoUrl });

    this.log('info', 'Create company in database.');

    const company = await this.companiesRepository.create({
      name: props.name,
      description: props.description,
      logoUrl,
      types: typeof props.types === 'object' ? props.types : Array(props.types),
      cnpj: props.cnpj,
    });

    this.log('info', 'Created successfully, finish process.');

    return { company };
  }
}
