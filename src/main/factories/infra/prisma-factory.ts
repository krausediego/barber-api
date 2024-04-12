import { ManagerPrisma } from '@/domain/interfaces';
import { PrismaManager } from '@/infra/prisma';

export const makePrisma = (): ManagerPrisma => {
  return new PrismaManager();
};
