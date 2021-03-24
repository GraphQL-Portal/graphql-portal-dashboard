import { Module } from '@nestjs/common';
import RedisModule from '../redis/redis.module';
import LogResolver from './log.resolver';
import LogService from './log.service';

@Module({
  imports: [RedisModule],
  providers: [LogService, LogResolver],
})
export default class LogModule {}
