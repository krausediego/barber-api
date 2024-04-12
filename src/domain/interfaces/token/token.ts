import jwt from 'jsonwebtoken';

export interface IToken {
  generateToken(sub: string, data?: Record<string, any>): string;
  verifyToken(token: string): string | jwt.JwtPayload;
  decodeToken(token: string): jwt.JwtPayload | null;
}
