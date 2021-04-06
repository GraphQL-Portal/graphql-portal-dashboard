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
    let keys: string[];

    if (!latestTimestamp) {
      keys = await this.redis.zrangebyscore('recent-logs', 0, maxScore);
    } else {
      keys = await this.redis.zrangebyscore(
        'recent-logs',
        +latestTimestamp + 1,
        maxScore,
        'LIMIT',
        0,
        count
      );
    }
    return keys.reverse().map((key) => JSON.parse(key));
  }
}
