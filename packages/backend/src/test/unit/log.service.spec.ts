import { Test, TestingModule } from '@nestjs/testing';
import AppModule from '../../modules/app.module';
import LogService from '../../modules/log/log.service';

jest.useFakeTimers();

jest.mock('ioredis');

describe('LogService', () => {
  let app: TestingModule;
  let logService: LogService;

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
      const keys = [0, 1];
      const logs = [
        {
          nodeId: 1,
          timestamp: 1,
        },
        {
          nodeId: 1,
          timestamp: 2,
        },
      ];
      const redisKeysMock = jest
        .spyOn((logService as any).redis, 'keys')
        .mockResolvedValue(keys);
      const redisGetMock = jest
        .spyOn((logService as any).redis, 'get')
        .mockImplementation((key: number) => JSON.stringify(logs[key]));
      const result = await logService.getLatestLogs();

      expect(redisKeysMock).toHaveBeenCalledTimes(1);
      expect(redisKeysMock).toHaveBeenCalledWith('logs:*');
      expect(redisGetMock).toHaveBeenCalledTimes(keys.length);
      expect(result).toStrictEqual(logs);
    });
  });
});
