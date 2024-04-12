export interface IHashManager {
  generateRandomHash(): string;
  generateHash(data: string): Promise<string>;
  compareHash(data: string, compared: string): Promise<boolean>;
}
