import { ICompaniesRepository } from '@/domain/interfaces';
import { CompaniesRepository } from '@/infra/prisma';
import { makePrisma } from '@/main/factories/infra';

export const makeCompaniesRepository = (): ICompaniesRepository => {
  return new CompaniesRepository(makePrisma());
};
