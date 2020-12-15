import LogLevel from './enum/log.level.enum';

export default interface LoggerConfig {
  application: {
    logLevel: LogLevel | string;
    logOutput?: 'json' | 'text' | string;
  };
}
