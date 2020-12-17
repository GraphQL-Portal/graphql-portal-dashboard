import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import IApiDef from '../../common/interface/api-def.interface';
import ApiDefService, { ApiDefsWithTimestamp } from './api-def.service';

@Resolver('ApiDef')
export default class ApiDefResolver {
  public constructor(private readonly service: ApiDefService) {}

  @Query()
  public publishApiDefsUpdated(): Promise<number> {
    return this.service.publishApiDefsUpdated();
  }

  @Query()
  public getApiDefs(): Promise<ApiDefsWithTimestamp> {
    return this.service.findAll();
  }

  @Mutation()
  public createApiDef(
    @Args('name') name: string,
    @Args('endpoint') endpoint: string,
    @Args('sources') sources: string[]
  ): Promise<IApiDef> {
    return this.service.create({ name, endpoint, sources });
  }

  @Mutation()
  public deleteApiDef(@Args('name') name: string): Promise<number> {
    return this.service.delete(name);
  }
}
