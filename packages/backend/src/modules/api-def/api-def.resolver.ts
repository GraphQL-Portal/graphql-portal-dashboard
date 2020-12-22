import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import IApiDef from '../../common/interface/api-def.interface';
import ApiDefService, { ApiDefsWithTimestamp } from './api-def.service';
import ApiDefCreateDto from './dto/api-def-create.dto';

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
  public createApiDef(@Args() data: ApiDefCreateDto): Promise<IApiDef> {
    return this.service.create(data.apiDef, data.sources);
  }

  @Mutation()
  public updateApiDef(
    @Args('name') name: string,
    @Args() { apiDef, sources }: ApiDefCreateDto
  ): Promise<IApiDef | null> {
    return this.service.update(name, apiDef, sources);
  }

  @Mutation()
  public deleteApiDef(@Args('name') name: string): Promise<boolean> {
    return this.service.delete(name);
  }
}
