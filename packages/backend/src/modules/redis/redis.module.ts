import { DynamicModule, FactoryProvider, Global, Module } from '@nestjs/common';
import IORedisClient from 'ioredis';
import ProviderEnum from '../../common/enum/provider.enum';
import RedisService from './redis.service';

class RedisClient extends IORedisClient {
  public async onModuleInit(): Promise<void> {
    await new Promise((resolve, reject) => {
      this.on('error', e => {
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
class RedisClientCluster extends IORedisClient.Cluster {
  public async onModuleInit(): Promise<void> {
    await new Promise((resolve, reject) => {
      this.on('error', e => {
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
  public static forRoot(
    connectionString: string,
    clusterNodes: string
  ): DynamicModule {
    const redisProvider: FactoryProvider<
      [RedisClient, RedisClient] | [RedisClientCluster, RedisClientCluster]
    > = {
      provide: ProviderEnum.REDIS,
      useFactory: () => {
        if (clusterNodes) {
          const nodes = clusterNodes.split(',').filter(Boolean);
          return [new RedisClientCluster(nodes), new RedisClientCluster(nodes)];
        }
        return [
          new RedisClient(connectionString),
          new RedisClient(connectionString),
        ];
      },
    };
    return {
      module: RedisModule,
      providers: [redisProvider, RedisService],
      exports: [redisProvider, RedisService],
    };
  }
}
