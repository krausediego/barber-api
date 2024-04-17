import { ICompany, ICreateCompany } from '@/domain/interfaces/services';
import { CreateCompanyService } from '@/domain/services';
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

const services = {
  createCompany,
};

export const makeCompanyService = (
  serviceName: ICompany.CompanyServicesNames,
): ICompany.CompanyServices => {
  return services[serviceName];
};
