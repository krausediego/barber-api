import { Router } from 'express';

import { adaptRoute } from '@/main/adapters';
import { makeHealthCheckController } from '@/main/factories/application/controllers';

export default (router: Router): void => {
  router.get('/health', adaptRoute(makeHealthCheckController()));
};
