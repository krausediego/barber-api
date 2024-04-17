import { IUsersProfilesRepository } from '@/domain/interfaces';
import { UsersProfilesRepository } from '@/infra/prisma';
import { makePrisma } from '@/main/factories/infra';

export const makeUsersProfilesRepository = (): IUsersProfilesRepository => {
  return new UsersProfilesRepository(makePrisma());
};
