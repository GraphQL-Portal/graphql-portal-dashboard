import { Query, Resolver } from '@nestjs/graphql';
import IGateway from '../../common/interface/gateway.interface';
import GatewayService from './gateway.service';

@Resolver('Gateway')
export default class GatewayResolver {
  public constructor(private readonly gatewayService: GatewayService) {}

  @Query()
  public getGateways(): Promise<IGateway[]> {
    return this.gatewayService.findAll();
  }
}
