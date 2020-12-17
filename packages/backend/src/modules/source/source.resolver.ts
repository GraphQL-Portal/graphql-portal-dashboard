import { Source } from '@graphql-mesh/types/config';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import SourceService from './source.service';

@Resolver('Source')
export default class SourceResolver {
  public constructor(private readonly sourceService: SourceService) {}

  @Query()
  public getSources(): Promise<Source[]> {
    return this.sourceService.findAll();
  }

  @Mutation()
  public createSource(
    @Args('name') name: string,
    @Args('handler') handler: string,
    @Args('transforms') transforms: string[]
  ): Promise<Source> {
    return this.sourceService.create({ name, handler, transforms });
  }

  @Mutation()
  public deleteSource(@Args('name') name: string): Promise<number> {
    return this.sourceService.delete(name);
  }
}
