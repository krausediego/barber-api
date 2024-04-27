import {
  ICompanyUser,
  IFindAllUsersCompanyUser,
} from '@/domain/interfaces/services';
import { FindAllUsersCompanyUserService } from '@/domain/services';
import { makeCompaniesUsersRepository } from '@/main/factories/domain/repositories';
import { makeLogging } from '@/main/factories/infra';

const findAllUsersCompanyUser = (): IFindAllUsersCompanyUser => {
  return new FindAllUsersCompanyUserService(
    makeLogging(),
    makeCompaniesUsersRepository(),
  );
};

const services = {
  findAllUsersCompanyUser,
};

export const makeCompanyUserService = (
  serviceName: ICompanyUser.CompanyUserServicesNames,
): ICompanyUser.CompanyUserServices => {
  return services[serviceName];
};
