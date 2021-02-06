import { Channel } from '@graphql-portal/types';
import { Inject, Injectable, OnModuleDestroy } from '@nestjs/common';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { Redis } from 'ioredis';
import Provider from '../../common/enum/provider.enum';
import Subscription from '../../common/enum/subscription.enum';
import { LoggerService } from '../../common/logger';

@Injectable({})
export default class RedisService implements OnModuleDestroy {
  private publisher: Redis;
  private subscriber: Redis;
  public readonly pubSub: RedisPubSub;

  public constructor(
    @Inject(Provider.REDIS) redisClients: [Redis, Redis],
    private readonly logger: LoggerService
  ) {
    this.publisher = redisClients[0];
    this.subscriber = redisClients[1];
    this.pubSub = new RedisPubSub({
      publisher: this.publisher,
      subscriber: this.subscriber,
    });
  }

  public async onModuleDestroy(): Promise<void> {
    await this.pubSub.close();
  }

  public async publishApiDefsUpdated(timestamp: number): Promise<number> {
    this.logger.log(
      `Publish event "${Channel.apiDefsUpdated}"`,
      this.constructor.name
    );
    return this.publisher.publish(Channel.apiDefsUpdated, `${timestamp}`);
  }

  public async on(
    channel: Channel,
    handler: (message: string) => any
  ): Promise<number> {
    this.logger.log(`Subscribe to channel "${channel}"`, this.constructor.name);
    this.subscriber.on('message', (messageChannel, message) => {
      if (channel === messageChannel) {
        handler(message);
      }
    });
    return this.subscriber.subscribe(channel);
  }

  public async publishGraphql(channel: Subscription, data: any): Promise<void> {
    this.pubSub.publish(channel, { [channel]: data });
  }
}
