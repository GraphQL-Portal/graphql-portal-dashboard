import { Channel } from '@graphql-portal/types';
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
    it('should parse and return first 100 logs', async () => {
      const redisZRangeMock = jest
        .spyOn((logService as any).redis, 'zrangebyscore')
        .mockResolvedValue(
          Array.from({ length: 5 }, () => JSON.stringify(log))
        );

      const result = await logService.getLatestLogs();

      expect(redisZRangeMock).toHaveBeenCalledTimes(1);
      expect(redisZRangeMock).toHaveBeenCalledWith(
        Channel.recentLogs,
        0,
        expect.any(Number),
        'LIMIT',
        0,
        100
      );
      expect(result).toStrictEqual(Array.from({ length: 5 }, () => log));
    });

    it('should parse and return latest 20 logs', async () => {
      const redisZRangeMock = jest
        .spyOn((logService as any).redis, 'zrangebyscore')
        .mockResolvedValue(
          Array.from({ length: 5 }, () => JSON.stringify(log))
        );

      const count = 10;
      const timestamp = '1';
      const result = await logService.getLatestLogs(timestamp, count);

      expect(redisZRangeMock).toHaveBeenCalledTimes(1);
      expect(redisZRangeMock).toHaveBeenCalledWith(
        Channel.recentLogs,
        +timestamp + 1,
        expect.any(Number),
        'LIMIT',
        0,
        count
      );
      expect(result).toStrictEqual(Array.from({ length: 5 }, () => log));
    });
  });
});
