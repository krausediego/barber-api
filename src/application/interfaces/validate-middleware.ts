import { ZodObject } from 'zod';

export namespace IValidateMiddleware {
  export interface Data {
    body: Record<string, any>;
    params: any;
    query: any;
    schema: ZodObject<any>;
  }
}
