import IApiDef from '../../common/interface/api-def.interface';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import ApiDefService from './api-def.service';

@Resolver('ApiDef')
export default class ApiDefResolver {
  public constructor(private readonly service: ApiDefService) {}

  @Query()
  public getApiDefs(): Promise<IApiDef[]> {
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
