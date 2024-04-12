import { HealthCheckController } from '@/application/controllers';
import { Controller } from '@/application/interfaces';

import { makeHealthCheckService } from '../../domain/services';

export const makeHealthCheckController = (): Controller => {
  return new HealthCheckController(makeHealthCheckService());
};
