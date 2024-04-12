import { HealthCheck } from '@/domain/interfaces';
import { HealthCheckService } from '@/domain/services';
import { makeLogging, makePrisma } from '@/main/factories/infra';

export const makeHealthCheckService = (): HealthCheck => {
  return new HealthCheckService(makeLogging(), makePrisma());
};
