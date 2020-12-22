import { Test, TestingModule } from '@nestjs/testing';
import { LoggerModule, LoggerService } from '../../common/logger';
import LogLevel from '../../common/logger/enum/log.level.enum';

describe('LoggerService', () => {
  let loggerService: LoggerService;
  let spiedPrintMessage: jest.MockedFunction<any>;

  const context = 'logger.service.spec';
  const logMethods = Object.values(LogLevel);

  beforeAll(async () => {
    process.env.NODE_ENV = 'testing';
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        LoggerModule.forRoot({
          application: {
            logLevel: LogLevel.log,
          },
        }),
      ],
    }).compile();
    process.env.NODE_ENV = 'test';

    loggerService = app.get<LoggerService>(LoggerService);
    spiedPrintMessage = jest.spyOn<any, any>(loggerService, 'printMessage').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('test env', () => {
    it('should not log anything', async () => {
      const app: TestingModule = await Test.createTestingModule({
        imports: [
          LoggerModule.forRoot({
            application: {
              logLevel: LogLevel.debug,
            },
          }),
        ],
      }).compile();

      const testEnvLogger = app.get<LoggerService>(LoggerService);
      const spiedTestPrintMessage = jest.spyOn<any, any>(testEnvLogger, 'printMessage').mockImplementation(() => null);

      logMethods.forEach((logMethod) => {
        testEnvLogger[logMethod](logMethod, '', context);
      });

      expect(spiedTestPrintMessage.mock.calls).toHaveLength(0);
    });
  });

  describe('another env', () => {
    const disabledMethods = [LogLevel.verbose, LogLevel.debug];
    logMethods.forEach((logMethod) => {
      it(`${logMethod} should call printMessage method`, () => {
        loggerService[logMethod](logMethod, '', context);
        if (disabledMethods.includes(logMethod)) {
          expect(spiedPrintMessage.mock.calls.length).toStrictEqual(0);
        } else {
          expect(spiedPrintMessage.mock.calls.length).toStrictEqual(1);
        }
      });
    });

    it('error method should call printMessage and printStackTrace', () => {
      loggerService.error(new Error('error'), null, context);
      loggerService.error('error', null, context);
      expect(spiedPrintMessage.mock.calls).toHaveLength(2);
    });
  });
});
