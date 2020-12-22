import { Channel } from '@graphql-portal/types';
import { Injectable } from '@nestjs/common';
import Subscription from '../../common/enum/subscription.enum';
import IGateway from '../../common/interface/gateway.interface';
import RedisService from '../redis/redis.service';

export type GatewayNodes = { [key: string]: IGateway };
export type ClearTimers = { [key: string]: NodeJS.Timeout };

@Injectable()
export default class GatewayService {
  private nodes: GatewayNodes = {};
  private clearNodes: ClearTimers = {};

  public constructor(private readonly redis: RedisService) {}

  public onApplicationBootstrap(): void {
    this.redis.on(Channel.ping, this.onPing.bind(this));
  }

  public findAll(): IGateway[] {
    return Object.values(this.nodes);
  }

  private onPing(data: string): void {
    const { nodeId, configTimestamp } = JSON.parse(data);
    this.nodes[nodeId] = { nodeId, lastPingAt: Date.now(), configTimestamp };
    this.setTimer(nodeId);
    this.gatewaysUpdated();
  }

  private setTimer(nodeId: string): void {
    if (this.clearNodes[nodeId]) {
      clearTimeout(this.clearNodes[nodeId]);
    }
    this.clearNodes[nodeId] = setTimeout(() => {
      delete this.nodes[nodeId];
      delete this.clearNodes[nodeId];
      this.gatewaysUpdated();
    }, 60000);
  }

  private gatewaysUpdated(): void {
    this.redis.publishGraphql(Subscription.gatewaysUpdated, this.findAll());
  }
}
