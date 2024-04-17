import { Router } from 'express';
import multer from 'multer';

import { createUserProfileValidateSchema } from '@/domain/schemas';
import { adaptRoute } from '@/main/adapters';
import { makeUserProfileController } from '@/main/factories/application/controllers';
import { validateRequest, authClient } from '@/main/middlewares';

const upload = multer();

export default (router: Router): void => {
  router.post(
    '/user-profile/create',
    authClient,
    upload.single('avatar'),
    validateRequest(createUserProfileValidateSchema),
    adaptRoute(makeUserProfileController('createUserProfile')),
  );

  router.get(
    '/user-profile/find',
    authClient,
    adaptRoute(makeUserProfileController('findUserProfile')),
  );
};
