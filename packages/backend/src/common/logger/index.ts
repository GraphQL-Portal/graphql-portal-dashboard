import { config } from 'node-config-ts';
import LoggerModule from './logger.module';
import LoggerService from './logger.service';

const logger = new LoggerService(config);

export { LoggerModule, LoggerService, logger };
