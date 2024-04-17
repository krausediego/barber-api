import { mock, MockProxy } from 'jest-mock-extended';

import { UserProfileController } from '@/application/controllers';
import { BadRequestError, InternalServerError } from '@/application/errors';
import { Http } from '@/application/interfaces';
import { ICreateUserProfile } from '@/domain/interfaces';

describe('UserProfileControllerCreateUserProfile', () => {
  let sut: UserProfileController;
  let createUserProfileService: MockProxy<ICreateUserProfile>;
  let content: Http.Request;
  let params: ICreateUserProfile.Params;
  let response: ICreateUserProfile.Response;

  beforeAll(() => {
    params = {
      name: 'name',
      specialties: ['BARBER'],
      avatar: {
        fileName: 'fileName',
        mimetype: 'mimetype',
        buffer: 'buffer' as unknown as Buffer,
      },
      userId: 'abc',
    };

    content = {
      method: 'POST',
      path: '/api',
      data: { ...params },
      locals: { traceId: 'trace-id', user: { sub: 'abc' } },
    };

    response = {
      userProfile: {
        id: 'abc',
        name: 'name',
        specialties: ['BARBER'],
        avatarUrl: 'https://',
        userId: 'abc',
        createdAt: new Date(),
        updatedAt: null,
      },
    };
  });

  beforeEach(() => {
    createUserProfileService = mock();
    createUserProfileService.run.mockResolvedValue(Promise.resolve(response));
    sut = new UserProfileController(
      'createUserProfile',
      () => createUserProfileService,
    );
  });

  it('Should call signInService with correct input', async () => {
    const httpResponse = await sut.handle(content);

    expect(createUserProfileService.run).toHaveBeenCalledWith({
      ...params,
      traceId: content.locals.traceId,
    });
    expect(createUserProfileService.run).toHaveBeenCalledTimes(1);
    expect(httpResponse).toEqual({
      statusCode: 200,
      body: response,
    });
  });

  it('Should return 204 if process succeeds', async () => {
    const httpResponse = await sut.handle(content);

    expect(createUserProfileService.run).toHaveBeenCalledTimes(1);
    expect(httpResponse).toEqual({
      statusCode: 200,
      body: response,
    });
  });

  it('Should return 200 if process succeeds without the locals object', async () => {
    Reflect.deleteProperty(content, 'locals');

    const httpResponse = await sut.handle(content);

    expect(createUserProfileService.run).toHaveBeenCalledTimes(1);
    expect(httpResponse).toEqual({
      statusCode: 200,
      body: response,
    });
  });

  it('Should return 401 on service error', async () => {
    createUserProfileService.run.mockRejectedValueOnce(
      new BadRequestError('Email or password is invalid'),
    );

    const { statusCode, body } = await sut.handle(content);

    expect(statusCode).toEqual(400);
    expect(body).toBeInstanceOf(BadRequestError);
    expect(body).toEqual(new BadRequestError('Email or password is invalid'));
  });

  it('Should return 500 on service error.', async () => {
    createUserProfileService.run.mockRejectedValueOnce(
      new InternalServerError('Internal server error'),
    );

    const { statusCode, body } = await sut.handle(content);

    expect(statusCode).toEqual(500);
    expect(body).toBeInstanceOf(InternalServerError);
    expect(body).toEqual(new InternalServerError('Internal server error'));
  });
});
