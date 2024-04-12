import { CompanyController } from '@/application/controllers';
import { Controller } from '@/application/interfaces';
import { ICompany } from '@/domain/interfaces';

import { makeCompanyService } from '../../domain/services';

export const makeCompanyController = (
  serviceName: ICompany.CompanyServicesNames,
): Controller => {
  return new CompanyController(serviceName, makeCompanyService(serviceName));
};
