import {
  ICompanyAddress,
  ICreateCompanyAddress,
} from '@/domain/interfaces/services';
import { CreateCompanyAddressService } from '@/domain/services';
import {
  makeCompaniesAddressesRepository,
  makeCompaniesRepository,
} from '@/main/factories/domain/repositories';
import { makeLogging } from '@/main/factories/infra';

const createCompanyAddress = (): ICreateCompanyAddress => {
  return new CreateCompanyAddressService(
    makeLogging(),
    makeCompaniesAddressesRepository(),
    makeCompaniesRepository(),
  );
};

const services = {
  createCompanyAddress,
};

export const makeCompanyAddressService = (
  serviceName: ICompanyAddress.CompanyAddressServicesNames,
): ICompanyAddress.CompanyAddressServices => {
  return services[serviceName];
};
