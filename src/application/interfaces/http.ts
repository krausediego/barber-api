import { CookieOptions } from 'express';

import { Locals } from '@/application/interfaces';

export namespace Http {
  export interface Request<Data = any> {
    method: string;
    path: string;
    data: Data;
    locals: Locals;
  }

  export interface Response {
    statusCode: number;
    code?: number;
    body?: any;
    cookie?: CookieProps;
    clearCookie?: string;
  }

  export interface CookieProps {
    name: string;
    val: string;
    options: CookieOptions;
  }
}
