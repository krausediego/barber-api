import { ICompany, ICreateCompany } from '@/domain/interfaces/services';
import { CreateCompanyService } from '@/domain/services';
import { makeCompaniesRepository } from '@/main/factories/domain/repositories';
import { makeGCPStorage, makeLogging } from '@/main/factories/infra';

const createCompany = (): ICreateCompany => {
  return new CreateCompanyService(
    makeLogging(),
    makeCompaniesRepository(),
    makeGCPStorage(),
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
