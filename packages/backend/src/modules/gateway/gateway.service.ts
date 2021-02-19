import { Channel } from '@graphql-portal/types';
import { Injectable } from '@nestjs/common';
import Subscription from '../../common/enum/subscription.enum';
import IGateway from '../../common/interface/gateway.interface';
import RedisService from '../redis/redis.service';
import GatewayStatusTimers from '../../common/enum/gateway-status-timers.enum';

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
    const {
      nodeId,
      configTimestamp,
      hostname,
      listenHostname,
      listenPort,
    } = JSON.parse(data);
    this.nodes[nodeId] = {
      nodeId,
      lastPingAt: Date.now(),
      configTimestamp,
      hostname,
      status: 'active',
      listenHostname,
      listenPort,
    };
    this.setTimer(nodeId);
    this.gatewaysUpdated();
  }

  private setTimer(nodeId: string): void {
    if (this.clearNodes[nodeId]) {
      clearTimeout(this.clearNodes[nodeId]);
    }
    this.clearNodes[nodeId] = setTimeout(() => {
      const lastPingAgo = Date.now() - this.nodes[nodeId].lastPingAt;

      if (
        this.nodes[nodeId].status === 'idle' &&
        lastPingAgo > GatewayStatusTimers.REMOVE_TIMEOUT
      ) {
        delete this.nodes[nodeId];
        delete this.clearNodes[nodeId];
      } else {
        this.nodes[nodeId].status = 'idle';
        this.setTimer(nodeId);
      }

      this.gatewaysUpdated();
    }, GatewayStatusTimers.STATUS_UPDATE);
  }

  private gatewaysUpdated(): void {
    this.redis.publishGraphql(Subscription.gatewaysUpdated, this.findAll());
  }
}
