import { mock, MockProxy } from 'jest-mock-extended';

import { HealthCheckController } from '@/application/controllers';
import { InternalServerError, UnauthorizedError } from '@/application/errors';
import { Http } from '@/application/interfaces';
import { HealthCheck } from '@/domain/interfaces';

describe('HealthCheckController', () => {
  let sut: HealthCheckController;
  let healthCheckService: MockProxy<HealthCheck>;
  let content: Http.Request;
  let params: HealthCheck.Params;
  let response: HealthCheck.Response;

  beforeAll(() => {
    content = {
      method: 'POST',
      path: '/api',
      data: {},
      locals: { traceId: 'trace-id' },
    };

    response = { postgresql: true };
  });

  beforeEach(() => {
    healthCheckService = mock();
    healthCheckService.run.mockResolvedValue(Promise.resolve(response));
    sut = new HealthCheckController(healthCheckService);
  });

  it('Should call signInService with correct input', async () => {
    const httpResponse = await sut.handle(content);

    expect(healthCheckService.run).toHaveBeenCalledWith({
      ...params,
      traceId: content.locals.traceId,
    });
    expect(healthCheckService.run).toHaveBeenCalledTimes(1);
    expect(httpResponse).toEqual({
      statusCode: 200,
      body: response,
    });
  });

  it('Should return 204 if process succeeds', async () => {
    const httpResponse = await sut.handle(content);

    expect(healthCheckService.run).toHaveBeenCalledTimes(1);
    expect(httpResponse).toEqual({
      statusCode: 200,
      body: response,
    });
  });

  it('Should return 200 if process succeeds without the locals object', async () => {
    Reflect.deleteProperty(content, 'locals');

    const httpResponse = await sut.handle(content);

    expect(healthCheckService.run).toHaveBeenCalledTimes(1);
    expect(httpResponse).toEqual({
      statusCode: 200,
      body: response,
    });
  });

  it('Should return 401 on service error', async () => {
    healthCheckService.run.mockRejectedValueOnce(
      new UnauthorizedError('Email or password is invalid'),
    );

    const { statusCode, body } = await sut.handle(content);

    expect(statusCode).toEqual(401);
    expect(body).toBeInstanceOf(UnauthorizedError);
    expect(body).toEqual(new UnauthorizedError('Email or password is invalid'));
  });

  it('Should return 500 on service error.', async () => {
    healthCheckService.run.mockRejectedValueOnce(
      new InternalServerError('Internal server error'),
    );

    const { statusCode, body } = await sut.handle(content);

    expect(statusCode).toEqual(500);
    expect(body).toBeInstanceOf(InternalServerError);
    expect(body).toEqual(new InternalServerError('Internal server error'));
  });
});
