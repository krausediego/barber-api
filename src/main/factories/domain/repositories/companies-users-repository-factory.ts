import { ICompaniesUsersRepository } from '@/domain/interfaces';
import { CompaniesUsersRepository } from '@/infra/prisma';
import { makePrisma } from '@/main/factories/infra';

export const makeCompaniesUsersRepository = (): ICompaniesUsersRepository => {
  return new CompaniesUsersRepository(makePrisma());
};
