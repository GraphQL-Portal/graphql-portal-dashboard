import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthorizationParam } from 'src/common/decorators';
import IApiDef from '../../common/interface/api-def.interface';
import ApiDefService, { ApiDefsWithTimestamp } from './api-def.service';
import ApiDefCreateDto from './dto/api-def-create.dto';

@Resolver('ApiDef')
export default class ApiDefResolver {
  public constructor(private readonly service: ApiDefService) { }

  @Query()
  public publishApiDefsUpdated(): Promise<number> {
    return this.service.publishApiDefsUpdated();
  }

  @Query()
  public getApiDefs(@AuthorizationParam('_id') userId: string): Promise<ApiDefsWithTimestamp> {
    return this.service.findAllByUser(userId);
  }

  @Mutation()
  public createApiDef(
    @Args() data: ApiDefCreateDto,
    @AuthorizationParam('_id') userId: string,
  ): Promise<IApiDef> {
    return this.service.create(data.apiDef, data.sources, userId);
  }

  @Mutation()
  public updateApiDef(
    @Args('name') name: string,
    @Args() { apiDef, sources }: ApiDefCreateDto,
    @AuthorizationParam('_id') userId: string,
  ): Promise<IApiDef | null> {
    return this.service.update(name, apiDef, sources, userId);
  }

  @Mutation()
  public deleteApiDef(
    @Args('name') name: string,
    @AuthorizationParam('_id') userId: string,
  ): Promise<boolean> {
    return this.service.delete(name, userId);
  }
}
