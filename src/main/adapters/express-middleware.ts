import { NextFunction, Request, Response } from 'express';
import { ZodObject } from 'zod';

import { Middleware } from '@/application/interfaces';

export const adaptMiddleware = (
  middleware: Middleware,
  schema?: ZodObject<any>,
) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const data = {
      accessToken: req.headers?.['x-access-token'],
      ...(req.headers ?? {}),
      ...(req.cookies ?? {}),
      body: req.body ?? {},
      params: req.params ?? {},
      query: req.query ?? {},
      file: req.file ?? {},
      schema: schema ?? {},
    };

    const httpResponse = await middleware.handle({
      data,
      method: req.method,
      path: req.path,
      locals: req.locals,
    });

    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      // Filters empty values and convert in array<key, value>.
      const validEntries = Object.entries(httpResponse?.body ?? {}).filter(
        ([, value]) => value,
      );

      // Add filtered values and convert in Object.
      // Obs: Use the locals object to obtain necessary infos in controllers.
      req.locals = { ...req.locals, ...Object.fromEntries(validEntries) };
      next();
    } else if (httpResponse?.body instanceof Error) {
      res.status(httpResponse.statusCode).json({
        message: httpResponse?.body?.message,
        code: httpResponse?.code,
      });
    } else {
      res.status(httpResponse.statusCode).json({
        message: httpResponse?.body,
        code: httpResponse?.code,
      });
    }
  };
};
