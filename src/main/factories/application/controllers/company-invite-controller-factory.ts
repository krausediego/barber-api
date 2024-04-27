import { CompanyInviteController } from '@/application/controllers';
import { Controller } from '@/application/interfaces';
import { ICompanyInvite } from '@/domain/interfaces';
import { makeCompanyInviteService } from '@/main/factories/domain/services';

export const makeCompanyInviteController = (
  serviceName: ICompanyInvite.CompanyInviteServicesNames,
): Controller => {
  return new CompanyInviteController(
    serviceName,
    makeCompanyInviteService(serviceName),
  );
};
