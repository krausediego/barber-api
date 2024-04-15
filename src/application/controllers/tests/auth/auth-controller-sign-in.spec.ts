import { mock, MockProxy } from 'jest-mock-extended';

import { AuthController } from '@/application/controllers';
import { InternalServerError, UnauthorizedError } from '@/application/errors';
import { Http } from '@/application/interfaces';
import { IAuthSignIn } from '@/domain/interfaces';

describe('AuthControllerSignIn', () => {
  let sut: AuthController;
  let authSignInService: MockProxy<IAuthSignIn>;
  let content: Http.Request;
  let params: IAuthSignIn.Params;
  let response: IAuthSignIn.Response;

  beforeAll(() => {
    params = { email: 'test@gmail.com', password: 'test12345' };

    content = {
      method: 'POST',
      path: '/api',
      data: { ...params },
      locals: { traceId: 'trace-id' },
    };

    response = { token: 'abc' };
  });

  beforeEach(() => {
    authSignInService = mock();
    authSignInService.run.mockResolvedValue(Promise.resolve(response));
    sut = new AuthController('authSignIn', () => authSignInService);
  });

  it('Should call signInService with correct input', async () => {
    const httpResponse = await sut.handle(content);

    expect(authSignInService.run).toHaveBeenCalledWith({
      ...params,
      traceId: content.locals.traceId,
    });
    expect(authSignInService.run).toHaveBeenCalledTimes(1);
    expect(httpResponse).toEqual({
      statusCode: 204,
      cookie: {
        name: 'token',
        val: 'abc',
        options: {
          httpOnly: true,
          maxAge: 6048000,
          path: '/',
        },
      },
    });
  });

  it('Should return 204 if process succeeds', async () => {
    const httpResponse = await sut.handle(content);

    expect(authSignInService.run).toHaveBeenCalledTimes(1);
    expect(httpResponse).toEqual({
      statusCode: 204,
      cookie: {
        name: 'token',
        val: 'abc',
        options: {
          httpOnly: true,
          maxAge: 6048000,
          path: '/',
        },
      },
    });
  });

  it('Should return 200 if process succeeds without the locals object', async () => {
    Reflect.deleteProperty(content, 'locals');

    const httpResponse = await sut.handle(content);

    expect(authSignInService.run).toHaveBeenCalledTimes(1);
    expect(httpResponse).toEqual({
      statusCode: 204,
      cookie: {
        name: 'token',
        val: 'abc',
        options: {
          httpOnly: true,
          maxAge: 6048000,
          path: '/',
        },
      },
    });
  });

  it('Should return 401 on service error', async () => {
    authSignInService.run.mockRejectedValueOnce(
      new UnauthorizedError('Email or password is invalid'),
    );

    const { statusCode, body } = await sut.handle(content);

    expect(statusCode).toEqual(401);
    expect(body).toBeInstanceOf(UnauthorizedError);
    expect(body).toEqual(new UnauthorizedError('Email or password is invalid'));
  });

  it('Should return 500 on service error.', async () => {
    authSignInService.run.mockRejectedValueOnce(
      new InternalServerError('Internal server error'),
    );

    const { statusCode, body } = await sut.handle(content);

    expect(statusCode).toEqual(500);
    expect(body).toBeInstanceOf(InternalServerError);
    expect(body).toEqual(new InternalServerError('Internal server error'));
  });
});
