import { ICompaniesAddressesRepository } from '@/domain/interfaces';
import { CompaniesAddressesRepository } from '@/infra/prisma';
import { makePrisma } from '@/main/factories/infra';

export const makeCompaniesAddressesRepository =
  (): ICompaniesAddressesRepository => {
    return new CompaniesAddressesRepository(makePrisma());
  };
