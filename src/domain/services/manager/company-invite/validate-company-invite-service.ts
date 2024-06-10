import { BadRequestError } from '@/application/errors';
import { BaseService } from '@/application/helpers';
import {
  ICompaniesInvitesRepository,
  ICompaniesUsersRepository,
  IValidateCompanyInvite,
  LoggingManager,
} from '@/domain/interfaces';

export class ValidateCompanyInviteService
  extends BaseService
  implements IValidateCompanyInvite
{
  constructor(
    protected readonly logger: LoggingManager,
    private readonly companiesInvitesRepository: ICompaniesInvitesRepository,
    private readonly companiesUsersRepository: ICompaniesUsersRepository,
  ) {
    super(logger);
  }

  async run({
    traceId,
    ...props
  }: IValidateCompanyInvite.Params): Promise<IValidateCompanyInvite.Response> {
    this.traceId = traceId;

    this.log('info', 'Start process validate company invite.');

    this.log('info', 'Find this code provided in database.');

    const invite = await this.companiesInvitesRepository.findByCode({
      code: props.code,
    });

    if (!invite) {
      this.log('warn', 'This code is invalid.');
      throw new BadRequestError('This code is invalid.');
    }

    this.log('info', 'Associate user to by company code provided.');

    await this.companiesUsersRepository.create({
      companyId: invite.companyId,
      userId: props.userId,
    });

    this.log(
      'info',
      'Code validated and user associate successfully, deleting code in database.',
    );

    await this.companiesInvitesRepository.delete({ id: invite.id });

    this.log('info', 'Finish process.');

    return { message: 'Code validated successfully.' };
  }
}
