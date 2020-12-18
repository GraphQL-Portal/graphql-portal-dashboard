import { Source } from '@graphql-mesh/types/config';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import SourceCreateDto from './dto/source-create.dto';
import SourceService from './source.service';

@Resolver('Source')
export default class SourceResolver {
  public constructor(private readonly sourceService: SourceService) {}

  @Query()
  public getSources(): Promise<Source[]> {
    return this.sourceService.findAll();
  }

  @Mutation()
  public createSource(@Args() data: SourceCreateDto): Promise<Source> {
    return this.sourceService.create(data.source);
  }

  @Mutation()
  public deleteSource(@Args('name') name: string): Promise<number> {
    return this.sourceService.delete(name);
  }
}
