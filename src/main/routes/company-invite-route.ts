import { Router } from 'express';

import {
  deleteCompanyInviteValidateSchema,
  validateCompanyInviteValidateSchema,
} from '@/domain/schemas';
import { adaptRoute } from '@/main/adapters';
import { makeCompanyInviteController } from '@/main/factories/application/controllers';
import { authClient, validateRequest, validateRole } from '@/main/middlewares';

export default (router: Router): void => {
  router.post(
    '/company-invite/create',
    authClient,
    validateRole,
    adaptRoute(makeCompanyInviteController('createCompanyInvite')),
  );

  router.post(
    '/company-invite/validate',
    authClient,
    validateRequest(validateCompanyInviteValidateSchema),
    adaptRoute(makeCompanyInviteController('validateCompanyInvite')),
  );

  router.get(
    '/company-invite/find-all',
    authClient,
    validateRole,
    adaptRoute(makeCompanyInviteController('findAllCompanyInvites')),
  );

  router.delete(
    '/company-invite/delete',
    authClient,
    validateRole,
    validateRequest(deleteCompanyInviteValidateSchema),
    adaptRoute(makeCompanyInviteController('deleteCompanyInvite')),
  );
};
