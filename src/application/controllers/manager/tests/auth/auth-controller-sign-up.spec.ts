import { mock, MockProxy } from 'jest-mock-extended';

import { AuthController } from '@/application/controllers';
import { InternalServerError, UnauthorizedError } from '@/application/errors';
import { Http } from '@/application/interfaces';
import { IAuthSignUp } from '@/domain/interfaces';

describe('AuthControllerSignUp', () => {
  let sut: AuthController;
  let authSignUpService: MockProxy<IAuthSignUp>;
  let content: Http.Request;
  let params: IAuthSignUp.Params;

  beforeAll(() => {
    params = { email: 'test@gmail.com', password: 'test12345' };

    content = {
      method: 'POST',
      path: '/api',
      data: { ...params },
      locals: { traceId: 'trace-id' },
    };
  });

  beforeEach(() => {
    authSignUpService = mock();
    authSignUpService.run.mockResolvedValue(Promise.resolve());
    sut = new AuthController('authSignUp', () => authSignUpService);
  });

  it('Should call signInService with correct input', async () => {
    const httpResponse = await sut.handle(content);

    expect(authSignUpService.run).toHaveBeenCalledWith({
      ...params,
      traceId: content.locals.traceId,
    });
    expect(authSignUpService.run).toHaveBeenCalledTimes(1);
    expect(httpResponse).toEqual({
      statusCode: 204,
    });
  });

  it('Should return 204 if process succeeds', async () => {
    const httpResponse = await sut.handle(content);

    expect(authSignUpService.run).toHaveBeenCalledTimes(1);
    expect(httpResponse).toEqual({
      statusCode: 204,
    });
  });

  it('Should return 200 if process succeeds without the locals object', async () => {
    Reflect.deleteProperty(content, 'locals');

    const httpResponse = await sut.handle(content);

    expect(authSignUpService.run).toHaveBeenCalledTimes(1);
    expect(httpResponse).toEqual({
      statusCode: 204,
    });
  });

  it('Should return 401 on service error', async () => {
    authSignUpService.run.mockRejectedValueOnce(
      new UnauthorizedError('Email or password is invalid'),
    );

    const { statusCode, body } = await sut.handle(content);

    expect(statusCode).toEqual(401);
    expect(body).toBeInstanceOf(UnauthorizedError);
    expect(body).toEqual(new UnauthorizedError('Email or password is invalid'));
  });

  it('Should return 500 on service error.', async () => {
    authSignUpService.run.mockRejectedValueOnce(
      new InternalServerError('Internal server error'),
    );

    const { statusCode, body } = await sut.handle(content);

    expect(statusCode).toEqual(500);
    expect(body).toBeInstanceOf(InternalServerError);
    expect(body).toEqual(new InternalServerError('Internal server error'));
  });
});
