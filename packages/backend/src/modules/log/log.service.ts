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

  public async getLatestLogs(latestTimestamp?: string): Promise<Log[]> {
    const count = 20;
    const keys = await this.redis.keys('logs:*');
    const logs = (
      await Promise.all<Log>(
        keys.map(async (key) => {
          const value = await this.redis.get(key);
          if (!value) return;

          const log = JSON.parse(value);
          if (!latestTimestamp) return log;
          if (+log.timestamp > +latestTimestamp) return log;
        })
      )
    ).filter(Boolean);
    logs.sort((a, b) => +b.timestamp - +a.timestamp);
    return logs.slice(logs.length - count, logs.length);
  }
}
