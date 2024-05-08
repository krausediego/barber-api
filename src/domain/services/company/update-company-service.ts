import { NotFoundError } from '@/application/errors';
import { BaseService } from '@/application/helpers';
import {
  ICompaniesRepository,
  IGCPStorage,
  IUpdateCompany,
  LoggingManager,
} from '@/domain/interfaces';

export class UpdateCompanyService
  extends BaseService
  implements IUpdateCompany
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
    companyId,
    logo,
    ...props
  }: IUpdateCompany.Params): Promise<void> {
    this.traceId = traceId;

    this.log('info', 'Start process update company.');

    const company = await this.companiesRepository.findById({ id: companyId });

    if (!company) {
      this.log('warn', 'Company not found');
      throw new NotFoundError('Company not found.');
    }

    let logoUrl;
    if (logo) {
      logoUrl = await this.gcpStorage.uploadFile({
        bucketName: 'barber_api_companies_logos',
        fileName: `${new Date().getTime()}_${logo.fileName}`,
        buffer: logo.buffer,
        mimetype: logo.mimetype,
      });

      const fileName = company.logoUrl.split('/').pop() as string;

      await this.gcpStorage.deleteFile({
        bucketname: 'barber_api_companies_logos',
        fileName,
      });
    }

    await this.companiesRepository.update({ ...props, logoUrl });

    this.log('info', 'Finish process.');
  }
}
