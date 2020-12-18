import { Channel } from '@graphql-portal/types';
import { Injectable } from '@nestjs/common';
import Subscription from '../../common/enum/subscription.enum';
import IGateway from '../../common/interface/gateway.interface';
import { LoggerService } from '../../common/logger';
import RedisService from '../redis/redis.service';

export type GatewayNodes = { [key: string]: IGateway };

@Injectable()
export default class GatewayService {
  private nodes: GatewayNodes = {};

  public constructor(private readonly logger: LoggerService, private readonly redis: RedisService) {}

  public onApplicationBootstrap(): void {
    this.redis.on(Channel.ping, this.onPing.bind(this));
  }

  private async onPing(data: string): Promise<void> {
    const { nodeId, configTimestamp } = JSON.parse(data);
    this.nodes[nodeId] = { nodeId, lastPingAt: Date.now(), configTimestamp };
    this.redis.publishGraphql(Subscription.gatewaysUpdated, this.findAll());
  }

  public findAll(): IGateway[] {
    return Object.values(this.nodes);
  }
}
