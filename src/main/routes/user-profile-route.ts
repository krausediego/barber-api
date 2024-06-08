import { Router } from 'express';
import multer from 'multer';

import {
  createUserProfileValidateSchema,
  updateUserProfileValidateSchema,
} from '@/domain/schemas';
import { adaptRoute } from '@/main/adapters';
import { makeUserProfileController } from '@/main/factories/application/controllers';
import { validateRequest, authClient } from '@/main/middlewares';

const upload = multer();

const routePrefix = '/user-profile';

export default (router: Router): void => {
  router.post(
    `${routePrefix}/create`,
    authClient,
    upload.single('avatar'),
    validateRequest(createUserProfileValidateSchema),
    adaptRoute(makeUserProfileController('createUserProfile')),
  );

  router.put(
    `${routePrefix}/update`,
    authClient,
    upload.single('avatar'),
    validateRequest(updateUserProfileValidateSchema),
    adaptRoute(makeUserProfileController('updateUserProfile')),
  );

  router.get(
    `${routePrefix}/find`,
    authClient,
    adaptRoute(makeUserProfileController('findUserProfile')),
  );
};
