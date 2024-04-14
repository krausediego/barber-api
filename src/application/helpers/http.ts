import {
  ForbiddenError,
  BadRequestError,
  NotFoundError,
  InternalServerError,
  UnauthorizedError,
  ConflictError,
} from '@/application/errors';
import { Http } from '@/application/interfaces';

type errorTypes =
  | BadRequestError
  | NotFoundError
  | ForbiddenError
  | InternalServerError
  | UnauthorizedError
  | ConflictError;

export const ok = (
  data: Record<string, any>,
  cookie?: Http.CookieProps,
): Http.Response => ({
  statusCode: 200,
  body: data,
  cookie,
});

export const created = (
  data: Record<string, any>,
  cookie?: Http.CookieProps,
): Http.Response => ({
  statusCode: 201,
  body: data,
  cookie,
});

export const noContent = (cookie?: Http.CookieProps): Http.Response => ({
  statusCode: 204,
  cookie,
});

export const getHttpError = (error: errorTypes): Http.Response => ({
  statusCode: error.statusCode || 500,
  code: error?.code,
  body: error,
});
