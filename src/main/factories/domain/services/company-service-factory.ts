import {
  ICompany,
  ICreateCompany,
  IFindCompany,
} from '@/domain/interfaces/services';
import { CreateCompanyService, FindCompanyService } from '@/domain/services';
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

const findCompany = (): IFindCompany => {
  return new FindCompanyService(makeLogging(), makeCompaniesRepository());
};

const services = {
  createCompany,
  findCompany,
};

export const makeCompanyService = (
  serviceName: ICompany.CompanyServicesNames,
): ICompany.CompanyServices => {
  return services[serviceName];
};
