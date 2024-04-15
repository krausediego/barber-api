import { mock, MockProxy } from 'jest-mock-extended';

import { CompanyController } from '@/application/controllers';
import { BadRequestError, InternalServerError } from '@/application/errors';
import { Http } from '@/application/interfaces';
import { ICreateCompany } from '@/domain/interfaces';

describe('CompanyControllerCreateCompany', () => {
  let sut: CompanyController;
  let createCompanyService: MockProxy<ICreateCompany>;
  let content: Http.Request;
  let params: ICreateCompany.Params;
  let response: ICreateCompany.Response;

  beforeAll(() => {
    params = {
      name: 'name',
      description: 'description',
      cnpj: '10299391',
      types: ['BARBER'],
      logo: {
        buffer: 'buffer' as unknown as Buffer,
        fileName: 'fileName',
        mimetype: 'mimetype',
      },
    };

    content = {
      method: 'POST',
      path: '/api',
      data: { ...params },
      locals: { traceId: 'trace-id' },
    };

    response = {
      company: {
        id: 'abc',
        name: 'name',
        description: 'description',
        cnpj: '0129193',
        types: ['BARBER'],
        logoUrl: 'http://test',
        createdAt: new Date(),
      },
    };
  });

  beforeEach(() => {
    createCompanyService = mock();
    createCompanyService.run.mockResolvedValue(Promise.resolve(response));
    sut = new CompanyController('createCompany', () => createCompanyService);
  });

  it('Should call signInService with correct input', async () => {
    const httpResponse = await sut.handle(content);

    expect(createCompanyService.run).toHaveBeenCalledWith({
      ...params,
      traceId: content.locals.traceId,
    });
    expect(createCompanyService.run).toHaveBeenCalledTimes(1);
    expect(httpResponse).toEqual({
      statusCode: 200,
      body: response,
    });
  });

  it('Should return 204 if process succeeds', async () => {
    const httpResponse = await sut.handle(content);

    expect(createCompanyService.run).toHaveBeenCalledTimes(1);
    expect(httpResponse).toEqual({
      statusCode: 200,
      body: response,
    });
  });

  it('Should return 200 if process succeeds without the locals object', async () => {
    Reflect.deleteProperty(content, 'locals');

    const httpResponse = await sut.handle(content);

    expect(createCompanyService.run).toHaveBeenCalledTimes(1);
    expect(httpResponse).toEqual({
      statusCode: 200,
      body: response,
    });
  });

  it('Should return 401 on service error', async () => {
    createCompanyService.run.mockRejectedValueOnce(
      new BadRequestError('Email or password is invalid'),
    );

    const { statusCode, body } = await sut.handle(content);

    expect(statusCode).toEqual(400);
    expect(body).toBeInstanceOf(BadRequestError);
    expect(body).toEqual(new BadRequestError('Email or password is invalid'));
  });

  it('Should return 500 on service error.', async () => {
    createCompanyService.run.mockRejectedValueOnce(
      new InternalServerError('Internal server error'),
    );

    const { statusCode, body } = await sut.handle(content);

    expect(statusCode).toEqual(500);
    expect(body).toBeInstanceOf(InternalServerError);
    expect(body).toEqual(new InternalServerError('Internal server error'));
  });
});
