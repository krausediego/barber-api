import { Router } from 'express';

import {
  authSignInValidateSchema,
  authSignUpValidateSchema,
} from '@/domain/schemas';
import { adaptRoute } from '@/main/adapters';
import { makeAuthController } from '@/main/factories/application/controllers';
import { authClient, validateRequest } from '@/main/middlewares';

export default (router: Router): void => {
  router.post(
    '/auth/sign-in',
    validateRequest(authSignInValidateSchema),
    adaptRoute(makeAuthController('authSignIn')),
  );

  router.post(
    '/auth/sign-up',
    validateRequest(authSignUpValidateSchema),
    adaptRoute(makeAuthController('authSignUp')),
  );

  router.post(
    '/auth/sign-out',
    authClient,
    adaptRoute(makeAuthController('authSignOut')),
  );
};
