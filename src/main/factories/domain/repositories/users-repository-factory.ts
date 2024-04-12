import { IUsersRepository } from '@/domain/interfaces';
import { UsersRepository } from '@/infra/prisma';
import { makePrisma } from '@/main/factories/infra';

export const makeUsersRepository = (): IUsersRepository => {
  return new UsersRepository(makePrisma());
};
