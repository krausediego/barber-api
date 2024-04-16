import { Router } from 'express';

import { createOperationTimeValidateSchema } from '@/domain/schemas';
import { adaptRoute } from '@/main/adapters';
import { makeOperationTimeController } from '@/main/factories/application/controllers';
import { authClient, validateRequest } from '@/main/middlewares';

export default (router: Router): void => {
  router.post(
    '/operation-time/create',
    authClient,
    validateRequest(createOperationTimeValidateSchema),
    adaptRoute(makeOperationTimeController('createOperationTime')),
  );
};
