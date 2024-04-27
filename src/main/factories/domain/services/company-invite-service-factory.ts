import {
  ICompanyInvite,
  ICreateCompanyInvite,
  IValidateCompanyInvite,
} from '@/domain/interfaces/services';
import {
  CreateCompanyInviteService,
  ValidateCompanyInviteService,
} from '@/domain/services';
import {
  makeCompaniesInvitesRepository,
  makeCompaniesUsersRepository,
} from '@/main/factories/domain/repositories';
import { makeLogging } from '@/main/factories/infra';

const createCompanyInvite = (): ICreateCompanyInvite => {
  return new CreateCompanyInviteService(
    makeLogging(),
    makeCompaniesInvitesRepository(),
  );
};

const validateCompanyInvite = (): IValidateCompanyInvite => {
  return new ValidateCompanyInviteService(
    makeLogging(),
    makeCompaniesInvitesRepository(),
    makeCompaniesUsersRepository(),
  );
};

const services = {
  createCompanyInvite,
  validateCompanyInvite,
};

export const makeCompanyInviteService = (
  serviceName: ICompanyInvite.CompanyInviteServicesNames,
): ICompanyInvite.CompanyInviteServices => {
  return services[serviceName];
};
