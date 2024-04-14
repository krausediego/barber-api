import { CookieOptions } from 'express';

export namespace Http {
  export interface Request<Data = any> {
    method: string;
    path: string;
    data: Data;
    locals?: any;
  }

  export interface Response {
    statusCode: number;
    code?: number;
    body?: any;
    cookie?: CookieProps;
  }

  export interface CookieProps {
    name: string;
    val: string;
    options: CookieOptions;
  }
}
