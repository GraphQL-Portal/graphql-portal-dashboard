import { Inject, Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';
import { LoggerService } from '../../common/logger';
import Provider from '../../common/enum/provider.enum';

@Injectable({})
export default class RedisService {
  public constructor(@Inject(Provider.REDIS) private readonly redis: Redis, private readonly logger: LoggerService) {}

  public async publishApiDefsUpdated(): Promise<number> {
    this.logger.log('Publish event "api-defs-updated"', this.constructor.name);
    return this.redis.publish('api-defs-updated', '');
  }

  public async on(channel: string, handler: (message: string) => any): Promise<number> {
    this.logger.log(`Subscribe to channel "${channel}"`, this.constructor.name);
    this.redis.on('message', (messageChannel, message) => {
      if (channel === messageChannel) {
        handler(message);
      }
    });
    return this.redis.subscribe(channel);
  }
}
