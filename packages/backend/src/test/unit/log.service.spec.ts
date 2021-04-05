import { Test, TestingModule } from '@nestjs/testing';
import AppModule from '../../modules/app.module';
import LogService from '../../modules/log/log.service';

jest.useFakeTimers();

jest.mock('ioredis');

describe('LogService', () => {
  let app: TestingModule;
  let logService: LogService;

  const log = {
    nodeId: 1,
  };

  beforeAll(async () => {
    app = await Test.createTestingModule({ imports: [AppModule] }).compile();

    logService = app.get<LogService>(LogService);
  });

  afterAll(async () => {
    jest.useRealTimers();
    await app.close();
  });

  afterEach(() => jest.clearAllMocks());

  describe('getLatestLogs', () => {
    it('should parse and return latest logs', async () => {
      const redisZRangeMock = jest
        .spyOn((logService as any).redis, 'zrangebyscore')
        .mockResolvedValue(
          Array.from({ length: 5 }, () => JSON.stringify(log))
        );

      const count = 10;
      const result = await logService.getLatestLogs(undefined, count);

      expect(redisZRangeMock).toHaveBeenCalledTimes(1);
      expect(redisZRangeMock).toHaveBeenCalledWith(
        'recent-logs',
        0,
        expect.any(Number),
        'LIMIT',
        0,
        count
      );
      expect(result).toStrictEqual(Array.from({ length: 5 }, () => log));
    });
  });
});
