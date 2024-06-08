import { BaseService } from '@/application/helpers';
import {
  ICompaniesUsersRepository,
  IFindAllUsersCompanyUser,
  LoggingManager,
} from '@/domain/interfaces';

export class FindAllUsersCompanyUserService
  extends BaseService
  implements IFindAllUsersCompanyUser
{
  constructor(
    protected readonly logger: LoggingManager,
    private readonly companiesUsersRepository: ICompaniesUsersRepository,
  ) {
    super(logger);
  }

  async run({
    traceId,
    ...props
  }: IFindAllUsersCompanyUser.Params): Promise<IFindAllUsersCompanyUser.Response> {
    this.traceId = traceId;

    this.log('info', 'Start process find all users company user.');

    this.log('info', 'Try to find all users for company.');

    const users = await this.companiesUsersRepository.findAllByCompanyId({
      userId: props.userId,
      companyId: props.companyId,
      filters: {
        ...props,
        specialties:
          props?.specialties && typeof props.specialties !== 'object'
            ? Array(props.specialties)
            : props.specialties,
      },
    });

    this.log('info', 'Finish process.');

    return { users };
  }
}
