import { Router } from 'express';

import {
  authSignInValidateSchema,
  authSignUpValidateSchema,
} from '@/domain/schemas';
import { adaptRoute } from '@/main/adapters';
import { makeAuthController } from '@/main/factories/application/controllers';
import { authClient, validateRequest } from '@/main/middlewares';

const routePrefix = '/auth';

export default (router: Router): void => {
  router.post(
    `${routePrefix}/sign-in`,
    validateRequest(authSignInValidateSchema),
    adaptRoute(makeAuthController('authSignIn')),
  );

  router.post(
    `${routePrefix}/sign-up`,
    validateRequest(authSignUpValidateSchema),
    adaptRoute(makeAuthController('authSignUp')),
  );

  router.post(
    `${routePrefix}/sign-out`,
    authClient,
    adaptRoute(makeAuthController('authSignOut')),
  );
};
