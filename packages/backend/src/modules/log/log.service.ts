import { Inject, Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';
import Provider from '../../common/enum/provider.enum';
import { Log } from './interfaces/log.interface';

@Injectable()
export default class LogService {
  private redis: Redis;

  public constructor(
    @Inject(Provider.REDIS) private readonly redisClients: [Redis, Redis]
  ) {
    [this.redis] = this.redisClients;
  }

  public async getLatestLogs(
    latestTimestamp?: string,
    count = 20
  ): Promise<Log[]> {
    const minScore = latestTimestamp ? +latestTimestamp + 1 : 0;
    return (
      await this.redis.zrangebyscore(
        // import channel from graphql-portal
        'recent-logs',
        minScore,
        +new Date(),
        'LIMIT',
        0,
        count
      )
    )
      .reverse()
      .map((key) => JSON.parse(key));
  }
}
