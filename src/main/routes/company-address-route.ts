import { Router } from 'express';

import { createCompanyAddressValidateSchema } from '@/domain/schemas';
import { adaptRoute } from '@/main/adapters';
import { makeCompanyAddressController } from '@/main/factories/application/controllers';
import { validateRequest, authClient } from '@/main/middlewares';

export default (router: Router): void => {
  router.post(
    '/company-address/create',
    authClient,
    validateRequest(createCompanyAddressValidateSchema),
    adaptRoute(makeCompanyAddressController('createCompanyAddress')),
  );
};
