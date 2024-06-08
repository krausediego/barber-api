import {
  ICompanyUser,
  IDeleteCompanyUser,
  IFindAllUsersCompanyUser,
} from '@/domain/interfaces/services';
import {
  DeleteCompanyUserService,
  FindAllUsersCompanyUserService,
} from '@/domain/services';
import { makeCompaniesUsersRepository } from '@/main/factories/domain/repositories';
import { makeLogging } from '@/main/factories/infra';

const findAllUsersCompanyUser = (): IFindAllUsersCompanyUser => {
  return new FindAllUsersCompanyUserService(
    makeLogging(),
    makeCompaniesUsersRepository(),
  );
};

const deleteCompanyUser = (): IDeleteCompanyUser => {
  return new DeleteCompanyUserService(
    makeLogging(),
    makeCompaniesUsersRepository(),
  );
};

const services = {
  findAllUsersCompanyUser,
  deleteCompanyUser,
};

export const makeCompanyUserService = (
  serviceName: ICompanyUser.CompanyUserServicesNames,
): ICompanyUser.CompanyUserServices => {
  return services[serviceName];
};
