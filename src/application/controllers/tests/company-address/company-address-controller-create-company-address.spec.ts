import { mock, MockProxy } from 'jest-mock-extended';

import { CompanyAddressController } from '@/application/controllers';
import { BadRequestError, InternalServerError } from '@/application/errors';
import { Http } from '@/application/interfaces';
import { ICreateCompanyAddress } from '@/domain/interfaces';

describe('CompanyAddressControllerCreateCompanyAddress', () => {
  let sut: CompanyAddressController;
  let createCompanyAddressService: MockProxy<ICreateCompanyAddress>;
  let content: Http.Request;
  let params: ICreateCompanyAddress.Params;
  let response: ICreateCompanyAddress.Response;

  beforeAll(() => {
    params = {
      city: 'city',
      district: 'district',
      state: 'state',
      street: 'street',
      zipCode: 'zipCode',
      number: 1,
      companyId: 'abc',
      lat: 123,
      long: 123,
      complement: 'complement',
      reference: 'reference',
    };

    content = {
      method: 'POST',
      path: '/api',
      data: { ...params },
      locals: { traceId: 'trace-id' },
    };

    response = {
      companyAddress: {
        id: 'abc',
        createdAt: new Date(),
        ...params,
      },
    };
  });

  beforeEach(() => {
    createCompanyAddressService = mock();
    createCompanyAddressService.run.mockResolvedValue(
      Promise.resolve(response),
    );
    sut = new CompanyAddressController(
      'createCompanyAddress',
      () => createCompanyAddressService,
    );
  });

  it('Should call signInService with correct input', async () => {
    const httpResponse = await sut.handle(content);

    expect(createCompanyAddressService.run).toHaveBeenCalledWith({
      ...params,
      traceId: content.locals.traceId,
    });
    expect(createCompanyAddressService.run).toHaveBeenCalledTimes(1);
    expect(httpResponse).toEqual({
      statusCode: 200,
      body: response,
    });
  });

  it('Should return 204 if process succeeds', async () => {
    const httpResponse = await sut.handle(content);

    expect(createCompanyAddressService.run).toHaveBeenCalledTimes(1);
    expect(httpResponse).toEqual({
      statusCode: 200,
      body: response,
    });
  });

  it('Should return 200 if process succeeds without the locals object', async () => {
    Reflect.deleteProperty(content, 'locals');

    const httpResponse = await sut.handle(content);

    expect(createCompanyAddressService.run).toHaveBeenCalledTimes(1);
    expect(httpResponse).toEqual({
      statusCode: 200,
      body: response,
    });
  });

  it('Should return 401 on service error', async () => {
    createCompanyAddressService.run.mockRejectedValueOnce(
      new BadRequestError('Email or password is invalid'),
    );

    const { statusCode, body } = await sut.handle(content);

    expect(statusCode).toEqual(400);
    expect(body).toBeInstanceOf(BadRequestError);
    expect(body).toEqual(new BadRequestError('Email or password is invalid'));
  });

  it('Should return 500 on service error.', async () => {
    createCompanyAddressService.run.mockRejectedValueOnce(
      new InternalServerError('Internal server error'),
    );

    const { statusCode, body } = await sut.handle(content);

    expect(statusCode).toEqual(500);
    expect(body).toBeInstanceOf(InternalServerError);
    expect(body).toEqual(new InternalServerError('Internal server error'));
  });
});
