import { mock, MockProxy } from 'jest-mock-extended';

import { TraceMiddleware } from '../../../src/application/middlewares';
import {
  LoggingManager,
  RandomGeneratorHash,
} from '../../../src/domain/interfaces';

describe('TraceMiddleware', () => {
  let sut: TraceMiddleware;
  let hash: MockProxy<RandomGeneratorHash>;
  let logger: MockProxy<LoggingManager>;

  beforeEach(() => {
    hash = mock();
    logger = mock();
  });

  beforeEach(() => {
    sut = new TraceMiddleware(hash, logger);
  });

  it('should return 200 if correct request', async () => {
    hash.generateRandomHash.mockReturnValue('any_hash_generation');

    const content = {
      data: { 'content-type': 'application/json' },
      method: 'POST',
      path: '/api',
    };

    const httpResponse = await sut.handle(content);

    expect(logger.info).toHaveBeenCalledWith(
      {
        method: content.method,
        path: content.path,
        traceId: httpResponse.body.traceId,
      },
      `${content.method} ${content.path}`,
    );
    expect(logger.info).toHaveBeenCalledTimes(1);
    expect(httpResponse).toEqual({
      statusCode: 200,
      body: { traceId: 'any_hash_generation' },
    });
  });
});
