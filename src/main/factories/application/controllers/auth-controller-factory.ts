import { AuthController } from '@/application/controllers';
import { Controller } from '@/application/interfaces';
import { IAuth } from '@/domain/interfaces';

import { makeAuthService } from '../../domain/services';

export const makeAuthController = (
  serviceName: IAuth.AuthServicesNames,
): Controller => {
  return new AuthController(serviceName, makeAuthService(serviceName));
};
