import { CompanyAddressController } from '@/application/controllers';
import { Controller } from '@/application/interfaces';
import { ICompanyAddress } from '@/domain/interfaces';
import { makeCompanyAddressService } from '@/main/factories/domain/services';

export const makeCompanyAddressController = (
  serviceName: ICompanyAddress.CompanyAddressServicesNames,
): Controller => {
  return new CompanyAddressController(
    serviceName,
    makeCompanyAddressService(serviceName),
  );
};
