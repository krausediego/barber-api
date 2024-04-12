import { hash, compare } from 'bcryptjs';
import { randomUUID } from 'node:crypto';

import { IHashManager } from '@/domain/interfaces';

export class HashManager implements IHashManager {
  generateRandomHash(): string {
    return randomUUID();
  }

  async generateHash(data: string): Promise<string> {
    return hash(data, 8);
  }

  async compareHash(data: string, compared: string): Promise<boolean> {
    return compare(data, compared);
  }
}
