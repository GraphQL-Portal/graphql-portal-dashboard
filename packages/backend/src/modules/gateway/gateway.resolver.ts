import { Query, Resolver, Subscription } from '@nestjs/graphql';
import { Roles } from '../../common/decorators';
import RolesEnum from '../../common/enum/roles.enum';
import SubscriptionEnum from '../../common/enum/subscription.enum';
import IGateway from '../../common/interface/gateway.interface';
import RedisService from '../redis/redis.service';
import GatewayService from './gateway.service';

@Resolver('Gateway')
export default class GatewayResolver {
  public constructor(
    private readonly gatewayService: GatewayService,
    private readonly redis: RedisService
  ) {}

  @Query()
  @Roles([RolesEnum.USER, RolesEnum.ADMIN])
  public getGateways(): IGateway[] {
    return this.gatewayService.findAll();
  }

  @Subscription()
  @Roles([RolesEnum.USER, RolesEnum.ADMIN])
  public gatewaysUpdated(): AsyncIterator<IGateway[]> {
    return this.redis.pubSub.asyncIterator(SubscriptionEnum.gatewaysUpdated);
  }
}
