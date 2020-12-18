import { Module, Global, DynamicModule } from '@nestjs/common';
import LoggerService from './logger.service';
import LoggerConfig from './logger.interface';

@Global()
@Module({
  providers: [LoggerService],
  exports: [LoggerService],
})
export default class LoggerModule {
  public static forRoot(config: LoggerConfig): DynamicModule {
    const loggerServiceFactory = {
      provide: LoggerService,
      useFactory: (): LoggerService => new LoggerService(config),
    };
    return {
      module: LoggerModule,
      providers: [loggerServiceFactory],
      exports: [loggerServiceFactory],
    };
  }
}
