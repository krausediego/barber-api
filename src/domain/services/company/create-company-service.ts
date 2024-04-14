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

  async run(params: ICreateCompany.Params): Promise<ICreateCompany.Reponse> {
    const { name, logo, description, types, cnpj, traceId } = params;
    const { fileName, buffer, mimetype } = logo;

    this.traceId = traceId;

    this.log('info', 'Start process create company.');

    this.log('info', 'Find company already exists.');

    const companyExists = await this.companiesRepository.findByCnpj({ cnpj });

    if (companyExists) {
      this.log('warn', 'Company already exists.');
      throw new ConflictError('Company already exists.');
    }

    this.log('info', 'Sending logo to GCP bucket.');

    const logoUrl = await this.gcpStorage.uploadFile({
      bucketName: 'barber-api',
      fileName: `${new Date().getTime()}_${fileName}`,
      buffer,
      mimetype,
    });

    this.log('info', 'Sending logo successfully.', { logoUrl });

    this.log('info', 'Create company in database.');

    const company = await this.companiesRepository.create({
      name,
      description,
      logoUrl,
      types: typeof types === 'object' ? types : Array(types),
      cnpj,
    });

    this.log('info', 'Created successfully, finish process.');

    return { company };
  }
}
