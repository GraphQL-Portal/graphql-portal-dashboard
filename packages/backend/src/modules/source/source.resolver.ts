import { SourceConfig } from '@graphql-portal/types';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthorizationParam } from 'src/common/decorators';
import SourceCreateDto from './dto/source-create.dto';
import SourceService from './source.service';

@Resolver('Source')
export default class SourceResolver {
  public constructor(private readonly service: SourceService) { }

  @Query()
  public getSources(
    @AuthorizationParam('_id') user: string,
  ): Promise<SourceConfig[]> {
    return this.service.findAll(user);
  }

  @Mutation()
  public createSource(
    @Args() data: SourceCreateDto,
    @AuthorizationParam('_id') user: string,
  ): Promise<SourceConfig> {
    return this.service.create(data.source, user);
  }

  @Mutation()
  public updateSource(
    @Args('name') name: string,
    @Args() { source }: SourceCreateDto,
    @AuthorizationParam('_id') user: string,
  ): Promise<SourceConfig | null> {
    return this.service.update(name, source, user);
  }

  @Mutation()
  public deleteSource(
    @Args('name') name: string,
    @AuthorizationParam('_id') user: string,
  ): Promise<boolean> {
    return this.service.delete(name, user);
  }
}
