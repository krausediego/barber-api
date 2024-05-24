import {
  ICompanyInvite,
  ICreateCompanyInvite,
  IDeleteCompanyInvite,
  IFindAllCompanyInvites,
  IValidateCompanyInvite,
} from '@/domain/interfaces/services';
import {
  CreateCompanyInviteService,
  DeleteCompanyInviteService,
  FindAllCompanyInvitesService,
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

const findAllCompanyInvites = (): IFindAllCompanyInvites => {
  return new FindAllCompanyInvitesService(
    makeLogging(),
    makeCompaniesInvitesRepository(),
  );
};

const deleteCompanyInvite = (): IDeleteCompanyInvite => {
  return new DeleteCompanyInviteService(
    makeLogging(),
    makeCompaniesInvitesRepository(),
  );
};

const services = {
  createCompanyInvite,
  validateCompanyInvite,
  findAllCompanyInvites,
  deleteCompanyInvite,
};

export const makeCompanyInviteService = (
  serviceName: ICompanyInvite.CompanyInviteServicesNames,
): ICompanyInvite.CompanyInviteServices => {
  return services[serviceName];
};
