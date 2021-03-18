import { Channel } from '@graphql-portal/types';
import { Test, TestingModule } from '@nestjs/testing';
import Subscription from '../../common/enum/subscription.enum';
import AppModule from '../../modules/app.module';
import LogService from '../../modules/log/log.service';
import RedisService from '../../modules/redis/redis.service';

jest.useFakeTimers();

jest.mock('ioredis');

describe('LogService', () => {
  let app: TestingModule;
  let logService: LogService;
  let redisService: RedisService;

  const log = {
    nodeId: 1,
  };

  beforeAll(async () => {
    app = await Test.createTestingModule({ imports: [AppModule] }).compile();

    logService = app.get<LogService>(LogService);
    redisService = app.get<RedisService>(RedisService);
  });

  afterAll(async () => {
    jest.useRealTimers();
    await app.close();
  });

  afterEach(() => jest.clearAllMocks());

  describe('onApplicationBootstrap', () => {
    it('should subscribe to the channel', async () => {
      const onMock = jest.spyOn(redisService, 'on').mockResolvedValueOnce(1);
      await app.init();

      expect(onMock).toHaveBeenCalledTimes(2);
      expect(onMock).toHaveBeenCalledWith(
        Channel.logsUpdated,
        expect.any(Function)
      );
    });
  });

  describe('logsUpdated', () => {
    it('should publish to the channel', async () => {
      const publishGraphqlMock = jest
        .spyOn(redisService, 'publishGraphql')
        .mockResolvedValueOnce();

      (logService as any).logsUpdated(log);

      expect(publishGraphqlMock).toHaveBeenCalledTimes(1);
      expect(publishGraphqlMock).toHaveBeenCalledWith(
        Subscription.logsUpdated,
        log
      );
    });
  });

  describe('getLatestLogs', () => {
    it('should parse and return latest logs', async () => {
      const keys = [1, 2, 3, 4];
      const redisKeysMock = jest
        .spyOn((logService as any).redis, 'keys')
        .mockResolvedValue(keys);
      const redisGetMock = jest
        .spyOn((logService as any).redis, 'get')
        .mockResolvedValue(JSON.stringify(log));

      const result = await logService.getLatestLogs();

      expect(redisKeysMock).toHaveBeenCalledTimes(1);
      expect(redisKeysMock).toHaveBeenCalledWith('logs:*');
      expect(redisGetMock).toHaveBeenCalledTimes(keys.length);
      expect(result).toStrictEqual(keys.map(() => log));
    });
  });
});
