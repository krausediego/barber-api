import jwt from 'jsonwebtoken';

import { IToken } from '@/domain/interfaces';
import env from '@/main/config/environments/application';

export class Token implements IToken {
  constructor() {}

  generateToken(sub: string, data: Record<string, any>): string {
    return jwt.sign({ sub, ...data }, env.jwtSecret, { expiresIn: '7 days' });
  }

  verifyToken(token: string): string | jwt.JwtPayload {
    return jwt.verify(token, env.jwtSecret);
  }

  decodeToken(token: string): jwt.JwtPayload | null {
    return jwt.decode(token, { json: true });
  }
}
