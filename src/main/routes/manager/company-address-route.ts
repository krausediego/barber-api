import { Router } from 'express';

import { createCompanyAddressValidateSchema } from '@/domain/schemas';
import { adaptRoute } from '@/main/adapters';
import { makeCompanyAddressController } from '@/main/factories/application/controllers';
import { validateRequest, authClient } from '@/main/middlewares';

const routePrefix = '/company-address';

export default (router: Router): void => {
  router.post(
    `${routePrefix}/create`,
    authClient,
    validateRequest(createCompanyAddressValidateSchema),
    adaptRoute(makeCompanyAddressController('createCompanyAddress')),
  );
};
