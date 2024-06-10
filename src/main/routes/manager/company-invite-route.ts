import { Router } from 'express';

import {
  deleteCompanyInviteValidateSchema,
  validateCompanyInviteValidateSchema,
} from '@/domain/schemas';
import { adaptRoute } from '@/main/adapters';
import { makeCompanyInviteController } from '@/main/factories/application/controllers';
import { authClient, validateRequest, validateRole } from '@/main/middlewares';

const routePrefix = '/company-invite';

export default (router: Router): void => {
  router.post(
    `${routePrefix}/create`,
    authClient,
    validateRole,
    adaptRoute(makeCompanyInviteController('createCompanyInvite')),
  );

  router.post(
    `${routePrefix}/validate`,
    authClient,
    validateRequest(validateCompanyInviteValidateSchema),
    adaptRoute(makeCompanyInviteController('validateCompanyInvite')),
  );

  router.get(
    `${routePrefix}/find-all`,
    authClient,
    validateRole,
    adaptRoute(makeCompanyInviteController('findAllCompanyInvites')),
  );

  router.delete(
    `${routePrefix}/delete`,
    authClient,
    validateRole,
    validateRequest(deleteCompanyInviteValidateSchema),
    adaptRoute(makeCompanyInviteController('deleteCompanyInvite')),
  );
};
