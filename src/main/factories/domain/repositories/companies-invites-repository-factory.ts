import { ICompaniesInvitesRepository } from '@/domain/interfaces';
import { CompaniesInvitesRepository } from '@/infra/prisma';
import { makePrisma } from '@/main/factories/infra';

export const makeCompaniesInvitesRepository =
  (): ICompaniesInvitesRepository => {
    return new CompaniesInvitesRepository(makePrisma());
  };
