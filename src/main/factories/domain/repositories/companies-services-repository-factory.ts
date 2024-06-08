import { ICompaniesServicesRepository } from '@/domain/interfaces';
import { CompaniesServicesRepository } from '@/infra/prisma';
import { makePrisma } from '@/main/factories/infra';

export const makeCompaniesServicesRepository =
  (): ICompaniesServicesRepository => {
    return new CompaniesServicesRepository(makePrisma());
  };
