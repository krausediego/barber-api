import { Router } from 'express';

import { createOperationTimeValidateSchema } from '@/domain/schemas';
import { adaptRoute } from '@/main/adapters';
import { makeOperationTimeController } from '@/main/factories/application/controllers';
import { authClient, validateRequest } from '@/main/middlewares';

const routePrefix = '/operation-time';

export default (router: Router): void => {
  router.post(
    `${routePrefix}/create`,
    authClient,
    validateRequest(createOperationTimeValidateSchema),
    adaptRoute(makeOperationTimeController('createOperationTime')),
  );
};
