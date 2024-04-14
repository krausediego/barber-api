import { Router } from 'express';
import multer from 'multer';

import { createCompanyValidateSchema } from '@/domain/schemas';
import { adaptRoute } from '@/main/adapters';
import { makeCompanyController } from '@/main/factories/application/controllers';
import { validateRequest, authClient } from '@/main/middlewares';

const upload = multer();

export default (router: Router): void => {
  router.post(
    '/company/create',
    authClient,
    upload.single('logo'),
    validateRequest(createCompanyValidateSchema),
    adaptRoute(makeCompanyController('createCompany')),
  );
};
