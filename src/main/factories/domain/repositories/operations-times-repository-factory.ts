import { IOperationsTimesRepository } from '@/domain/interfaces';
import { OperationsTimesRepository } from '@/infra/prisma';
import { makePrisma } from '@/main/factories/infra';

export const makeOperationsTimesRepository = (): IOperationsTimesRepository => {
  return new OperationsTimesRepository(makePrisma());
};
