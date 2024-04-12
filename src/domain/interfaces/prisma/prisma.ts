import { PrismaClient } from '@prisma/client';

export interface ManagerPrisma {
  getPrisma(): PrismaClient;
  checkConnection(): Promise<boolean>;
}
