import {
  ICompany,
  ICreateCompany,
  IFindCompany,
  IUpdateCompany,
} from '@/domain/interfaces/services';
import {
  CreateCompanyService,
  FindCompanyService,
  UpdateCompanyService,
} from '@/domain/services';
import {
  makeCompaniesRepository,
  makeCompaniesUsersRepository,
  makeUsersRepository,
} from '@/main/factories/domain/repositories';
import { makeGCPStorage, makeLogging, makeToken } from '@/main/factories/infra';

const createCompany = (): ICreateCompany => {
  return new CreateCompanyService(
    makeLogging(),
    makeCompaniesRepository(),
    makeCompaniesUsersRepository(),
    makeUsersRepository(),
    makeGCPStorage(),
    makeToken(),
  );
};

const updateCompany = (): IUpdateCompany => {
  return new UpdateCompanyService(
    makeLogging(),
    makeCompaniesRepository(),
    makeGCPStorage(),
  );
};

const findCompany = (): IFindCompany => {
  return new FindCompanyService(makeLogging(), makeCompaniesRepository());
};

const services = {
  createCompany,
  updateCompany,
  findCompany,
};

export const makeCompanyService = (
  serviceName: ICompany.CompanyServicesNames,
): ICompany.CompanyServices => {
  return services[serviceName];
};
