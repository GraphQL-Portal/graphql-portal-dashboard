import { SourceConfig } from '@graphql-portal/types';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import SourceCreateDto from './dto/source-create.dto';
import SourceService from './source.service';

@Resolver('Source')
export default class SourceResolver {
  public constructor(private readonly service: SourceService) {}

  @Query()
  public getSources(): Promise<SourceConfig[]> {
    return this.service.findAll();
  }

  @Mutation()
  public createSource(@Args() data: SourceCreateDto): Promise<SourceConfig> {
    return this.service.create(data.source);
  }

  @Mutation()
  public updateSource(@Args('name') name: string, @Args() { source }: SourceCreateDto): Promise<SourceConfig | null> {
    return this.service.update(name, source);
  }

  @Mutation()
  public deleteSource(@Args('name') name: string): Promise<boolean> {
    return this.service.delete(name);
  }
}
