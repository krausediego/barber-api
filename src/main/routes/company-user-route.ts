import { Router } from 'express';

import { adaptRoute } from '@/main/adapters';
import { makeCompanyUserController } from '@/main/factories/application/controllers';
import { authClient, validateRole } from '@/main/middlewares';

const routePrefix = '/company-user';

export default (router: Router): void => {
  router.get(
    `${routePrefix}/find-all`,
    authClient,
    validateRole,
    adaptRoute(makeCompanyUserController('findAllUsersCompanyUser')),
  );
};
