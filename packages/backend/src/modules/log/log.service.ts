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
    const maxScore = +new Date();
    const minScore = latestTimestamp ? +latestTimestamp + 1 : 0;
    count = latestTimestamp ? count : 100;

    return (
      await this.redis.zrangebyscore(
        'recent-logs',
        minScore,
        maxScore,
        'LIMIT',
        0,
        count
      )
    )
      .reverse()
      .map((key) => JSON.parse(key));
  }
}
