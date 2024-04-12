import { ManagerPrisma } from '@/domain/interfaces';
import { PrismaClient } from '@prisma/client';

export class PrismaManager implements ManagerPrisma {
  public readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  getPrisma(): PrismaClient {
    return this.prisma;
  }

  async checkConnection(): Promise<boolean> {
    try {
      const result = await this.prisma.$queryRaw`SELECT 1`;

      return !!result;
    } catch (error: any) {
      return false;
    }
  }
}
