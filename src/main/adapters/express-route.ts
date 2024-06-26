import { Request, Response } from 'express';

import { Controller } from '@/application/interfaces';

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response): Promise<void> => {
    const data = {
      ...(req?.body ?? {}),
      ...(req?.params ?? {}),
      ...(req?.query ?? {}),
      ...(req?.file && {
        [req?.file?.fieldname as string]:
          {
            fileName: req?.file?.originalname,
            buffer: req?.file?.buffer,
            mimetype: req?.file?.mimetype,
          } ?? {},
      }),
    };

    const httpResponse = await controller.handle({
      data,
      method: req.method,
      path: req.path,
      locals: req.locals,
    });

    if (httpResponse.clearCookie) {
      res.clearCookie(httpResponse.clearCookie);
    }

    if (
      httpResponse.statusCode >= 200 &&
      httpResponse.statusCode <= 299 &&
      !httpResponse.cookie
    ) {
      res.status(httpResponse.statusCode).json(httpResponse?.body);
    } else if (
      httpResponse.statusCode >= 200 &&
      httpResponse.statusCode <= 299 &&
      httpResponse.cookie
    ) {
      const { name, val, options } = httpResponse.cookie;

      res.status(httpResponse.statusCode).cookie(name, val, options).send();
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
