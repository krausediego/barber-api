import {
  IOperationTime,
  ICreateOperationTime,
} from '@/domain/interfaces/services';
import { CreateOperationTimeService } from '@/domain/services';
import {
  makeOperationsTimesRepository,
  makeCompaniesRepository,
} from '@/main/factories/domain/repositories';
import { makeLogging } from '@/main/factories/infra';

const createOperationTime = (): ICreateOperationTime => {
  return new CreateOperationTimeService(
    makeLogging(),
    makeOperationsTimesRepository(),
    makeCompaniesRepository(),
  );
};

const services = {
  createOperationTime,
};

export const makeOperationTimeService = (
  serviceName: IOperationTime.OperationTimeServicesNames,
): IOperationTime.OperationTimeServices => {
  return services[serviceName];
};
