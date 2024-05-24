import { Router } from 'express';
import multer from 'multer';

import { createCompanyValidateSchema } from '@/domain/schemas';
import { adaptRoute } from '@/main/adapters';
import { makeCompanyController } from '@/main/factories/application/controllers';
import { validateRequest, authClient, validateRole } from '@/main/middlewares';

const upload = multer();

const routePrefix = '/company';

export default (router: Router): void => {
  router.post(
    `${routePrefix}/create`,
    authClient,
    upload.single('logo'),
    validateRequest(createCompanyValidateSchema),
    adaptRoute(makeCompanyController('createCompany')),
  );

  router.put(
    `${routePrefix}/update`,
    authClient,
    upload.single('logo'),
    validateRole,
    adaptRoute(makeCompanyController('updateCompany')),
  );

  router.get(
    `${routePrefix}/find`,
    authClient,
    validateRole,
    adaptRoute(makeCompanyController('findCompany')),
  );
};
