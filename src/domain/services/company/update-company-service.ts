import { NotFoundError } from '@/application/errors';
import { BaseService } from '@/application/helpers';
import {
  ICompaniesRepository,
  IManageStorage,
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
    private readonly storage: IManageStorage,
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
      const { fileUrl } = await this.storage.upload({
        bucketName: 'companies_logos',
        path: `${new Date().getTime()}_${props.name?.replace(/\s/g, '')}_${logo.fileName?.replace(/\s/g, '')}`,
        fileBody: logo.buffer,
        contentType: logo.mimetype,
      });
      logoUrl = fileUrl;

      const fileName = company?.logoUrl.split('/').pop() as string;

      await this.storage.delete({
        bucketName: 'companies_logos',
        fileName: [fileName],
      });
    }

    await this.companiesRepository.update({ ...props, logoUrl });

    this.log('info', 'Finish process.');
  }
}
