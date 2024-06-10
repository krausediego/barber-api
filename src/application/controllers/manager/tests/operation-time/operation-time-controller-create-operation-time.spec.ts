import { mock, MockProxy } from 'jest-mock-extended';

import { OperationTimeController } from '@/application/controllers';
import { BadRequestError, InternalServerError } from '@/application/errors';
import { Http } from '@/application/interfaces';
import { ICreateOperationTime } from '@/domain/interfaces';

describe('OperationTimeControllerCreateOperationTime', () => {
  let sut: OperationTimeController;
  let createOperationTimeService: MockProxy<ICreateOperationTime>;
  let content: Http.Request;
  let params: ICreateOperationTime.Params;
  let response: ICreateOperationTime.Response;

  beforeAll(() => {
    params = {
      startMorning: '07:00',
      endMorning: null,
      startAfternoon: null,
      endAfternoon: '18:00',
      companyId: 'abc',
    };

    content = {
      method: 'POST',
      path: '/api',
      data: { ...params },
      locals: { traceId: 'trace-id' },
    };

    response = {
      operationTime: {
        id: 'abc',
        createdAt: new Date(),
        updatedAt: null,
        ...params,
      },
    };
  });

  beforeEach(() => {
    createOperationTimeService = mock();
    createOperationTimeService.run.mockResolvedValue(Promise.resolve(response));
    sut = new OperationTimeController(
      'createOperationTime',
      () => createOperationTimeService,
    );
  });

  it('Should call signInService with correct input', async () => {
    const httpResponse = await sut.handle(content);

    expect(createOperationTimeService.run).toHaveBeenCalledWith({
      ...params,
      traceId: content.locals.traceId,
    });
    expect(createOperationTimeService.run).toHaveBeenCalledTimes(1);
    expect(httpResponse).toEqual({
      statusCode: 200,
      body: response,
    });
  });

  it('Should return 204 if process succeeds', async () => {
    const httpResponse = await sut.handle(content);

    expect(createOperationTimeService.run).toHaveBeenCalledTimes(1);
    expect(httpResponse).toEqual({
      statusCode: 200,
      body: response,
    });
  });

  it('Should return 200 if process succeeds without the locals object', async () => {
    Reflect.deleteProperty(content, 'locals');

    const httpResponse = await sut.handle(content);

    expect(createOperationTimeService.run).toHaveBeenCalledTimes(1);
    expect(httpResponse).toEqual({
      statusCode: 200,
      body: response,
    });
  });

  it('Should return 401 on service error', async () => {
    createOperationTimeService.run.mockRejectedValueOnce(
      new BadRequestError('Email or password is invalid'),
    );

    const { statusCode, body } = await sut.handle(content);

    expect(statusCode).toEqual(400);
    expect(body).toBeInstanceOf(BadRequestError);
    expect(body).toEqual(new BadRequestError('Email or password is invalid'));
  });

  it('Should return 500 on service error.', async () => {
    createOperationTimeService.run.mockRejectedValueOnce(
      new InternalServerError('Internal server error'),
    );

    const { statusCode, body } = await sut.handle(content);

    expect(statusCode).toEqual(500);
    expect(body).toBeInstanceOf(InternalServerError);
    expect(body).toEqual(new InternalServerError('Internal server error'));
  });
});
