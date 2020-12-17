import { Module } from '@nestjs/common';
import RedisModule from '../redis/redis.module';
import GatewayResolver from './gateway.resolver';
import GatewayService from './gateway.service';

@Module({
  imports: [RedisModule],
  providers: [GatewayService, GatewayResolver],
})
export default class GatewayModule {}
