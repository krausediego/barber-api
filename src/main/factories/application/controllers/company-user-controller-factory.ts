import { CompanyUserController } from '@/application/controllers';
import { Controller } from '@/application/interfaces';
import { ICompanyUser } from '@/domain/interfaces';
import { makeCompanyUserService } from '@/main/factories/domain/services';

export const makeCompanyUserController = (
  serviceName: ICompanyUser.CompanyUserServicesNames,
): Controller => {
  return new CompanyUserController(
    serviceName,
    makeCompanyUserService(serviceName),
  );
};
