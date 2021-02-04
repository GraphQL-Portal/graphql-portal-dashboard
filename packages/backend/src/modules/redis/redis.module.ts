import { DynamicModule, FactoryProvider, Global, Module } from '@nestjs/common';
import IORedisClient, { Redis } from 'ioredis';
import ProviderEnum from '../../common/enum/provider.enum';
import RedisService from './redis.service';

class RedisClient extends IORedisClient {
  public async onModuleInit(): Promise<void> {
    await new Promise((resolve, reject) => {
      this.on('error', (e) => {
        this.disconnect();
        reject(e);
      });
      this.on('connect', resolve);
    });
  }

  public async onModuleDestroy(): Promise<void> {
    await this.quit();
  }
}

@Global()
@Module({})
export default class RedisModule {
  public static forRoot(connectionString: string): DynamicModule {
    const redisProvider: FactoryProvider<[Redis, Redis]> = {
      provide: ProviderEnum.REDIS,
      useFactory: (): [Redis, Redis] => [
        new RedisClient(connectionString),
        new RedisClient(connectionString),
      ],
    };
    return {
      module: RedisModule,
      providers: [redisProvider, RedisService],
      exports: [redisProvider, RedisService],
    };
  }
}
