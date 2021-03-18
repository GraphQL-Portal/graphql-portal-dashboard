import { Channel } from '@graphql-portal/types';
import { Inject, Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';
import Provider from '../../common/enum/provider.enum';
import Subscription from '../../common/enum/subscription.enum';
import RedisService from '../redis/redis.service';
import { Log } from './interfaces/log.interface';

@Injectable()
export default class LogService {
  private redis: Redis;

  public constructor(
    @Inject(Provider.REDIS) private readonly redisClients: [Redis, Redis],
    private readonly redisService: RedisService
  ) {
    [this.redis] = this.redisClients;
  }

  public onApplicationBootstrap(): void {
    this.redisService.on(Channel.logsUpdated, (message: string) =>
      this.logsUpdated(JSON.parse(message))
    );
  }

  private async logsUpdated(log: void): Promise<void> {
    return this.redisService.publishGraphql(Subscription.logsUpdated, log);
  }

  public async getLatestLogs(): Promise<Log[]> {
    const keys = await this.redis.keys('logs:*');
    return (
      await Promise.all<Log>(
        keys.map(async (key) => {
          const value = await this.redis.get(key);
          if (value) return JSON.parse(value);
        })
      )
    ).filter(Boolean);
  }
}
