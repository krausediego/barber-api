import { OperationTimeController } from '@/application/controllers';
import { Controller } from '@/application/interfaces';
import { IOperationTime } from '@/domain/interfaces';
import { makeOperationTimeService } from '@/main/factories/domain/services';

export const makeOperationTimeController = (
  serviceName: IOperationTime.OperationTimeServicesNames,
): Controller => {
  return new OperationTimeController(
    serviceName,
    makeOperationTimeService(serviceName),
  );
};
