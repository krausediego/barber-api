import { Router } from 'express';

import { deleteCompanyUserValidateSchema } from '@/domain/schemas/company-user';
import { adaptRoute } from '@/main/adapters';
import { makeCompanyUserController } from '@/main/factories/application/controllers';
import { authClient, validateRequest, validateRole } from '@/main/middlewares';

const routePrefix = '/company-user';

export default (router: Router): void => {
  router.get(
    `${routePrefix}/find-all`,
    authClient,
    validateRole,
    adaptRoute(makeCompanyUserController('findAllUsersCompanyUser')),
  );

  router.delete(
    `${routePrefix}/delete`,
    authClient,
    validateRole,
    validateRequest(deleteCompanyUserValidateSchema),
    adaptRoute(makeCompanyUserController('deleteCompanyUser')),
  );
};
