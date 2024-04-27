import { Router } from 'express';

import { adaptRoute } from '@/main/adapters';
import { makeCompanyUserController } from '@/main/factories/application/controllers';
import { authClient, validateRole } from '@/main/middlewares';

export default (router: Router): void => {
  router.get(
    '/company-user/find-all',
    authClient,
    validateRole,
    adaptRoute(makeCompanyUserController('findAllUsersCompanyUser')),
  );
};
