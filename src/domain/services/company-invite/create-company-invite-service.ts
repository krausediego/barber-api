import { BaseService } from '@/application/helpers';
import {
  ICompaniesInvitesRepository,
  ICreateCompanyInvite,
  LoggingManager,
} from '@/domain/interfaces';

export class CreateCompanyInviteService
  extends BaseService
  implements ICreateCompanyInvite
{
  constructor(
    protected readonly logger: LoggingManager,
    private readonly companiesInvitesRepository: ICompaniesInvitesRepository,
  ) {
    super(logger);
  }

  async run({
    traceId,
    ...props
  }: ICreateCompanyInvite.Params): Promise<ICreateCompanyInvite.Response> {
    this.traceId = traceId;

    this.log('info', 'Start process create company invite.');

    this.log('info', 'Generate random code.');

    const code = this.generateCode();

    this.log('info', 'Save company invite in database.');

    const companyInvite = await this.companiesInvitesRepository.create({
      code,
      companyId: props.companyId,
    });

    this.log('info', 'Finish process.');

    return { companyInvite };
  }

  private generateCode() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';

    for (let i = 0; i < 8; i += 1) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      code += chars[randomIndex];
    }

    return code;
  }
}
