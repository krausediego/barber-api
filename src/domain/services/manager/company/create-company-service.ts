import { ConflictError } from '@/application/errors';
import { BaseService } from '@/application/helpers';
import {
  ICompaniesRepository,
  ICompaniesUsersRepository,
  ICreateCompany,
  IManageStorage,
  IToken,
  IUsersRepository,
  LoggingManager,
} from '@/domain/interfaces';

export class CreateCompanyService
  extends BaseService
  implements ICreateCompany
{
  constructor(
    protected readonly logger: LoggingManager,
    private readonly companiesRepository: ICompaniesRepository,
    private readonly companiesUsersRepository: ICompaniesUsersRepository,
    private readonly usersRepository: IUsersRepository,
    private readonly storage: IManageStorage,
    private readonly token: IToken,
  ) {
    super(logger);
  }

  async run({
    traceId,
    userId,
    ...props
  }: ICreateCompany.Params): Promise<ICreateCompany.Response> {
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

    this.log('info', 'Sending logo to GCP bucket.', {
      type: props.logo.mimetype,
    });

    const { fileUrl } = await this.storage.upload({
      bucketName: 'companies_logos',
      path: `${new Date().getTime()}_${props.name.replace(/\s/g, '')}_${props.logo.fileName.replace(/\s/g, '')}`,
      fileBody: props.logo.buffer,
      contentType: props.logo.mimetype,
    });

    this.log('info', 'Sending logo successfully.', { fileUrl });

    this.log('info', 'Create company in database.');

    const company = await this.companiesRepository.create({
      name: props.name,
      description: props.description,
      logoUrl: fileUrl,
      types: typeof props.types === 'object' ? props.types : Array(props.types),
      cnpj: props.cnpj,
    });

    this.log('info', 'Create bond user and company.');

    await this.companiesUsersRepository.create({
      userId,
      companyId: company.id,
    });

    this.log('info', 'Update role user.');

    await this.usersRepository.update(userId, { role: 'ADMIN' });

    this.log('info', 'Generate new token authentication.');

    const token = this.token.generateToken(userId, {
      companyId: company.id,
      role: 'ADMIN',
    });

    this.log('info', 'Finish process.');

    return { company, token };
  }
}
