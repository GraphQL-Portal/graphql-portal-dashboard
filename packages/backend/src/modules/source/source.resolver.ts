import { SourceConfig } from '@graphql-portal/types';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AccessControl, AuthorizationParam, Roles } from '../../common/decorators';
import AccessControlModels from '../../common/enum/access-control-models.enum';
import RolesEnum from '../../common/enum/roles.enum';
import SourceCreateDto from './dto/source-create.dto';
import SourceService from './source.service';

@Resolver('Source')
export default class SourceResolver {
  public constructor(private readonly service: SourceService) { }

  @Query()
  @Roles([RolesEnum.USER, RolesEnum.ADMIN])
  public getSources(
    @AuthorizationParam('_id') user: string,
  ): Promise<SourceConfig[]> {
    return this.service.findAllByUser(user);
  }

  @Mutation()
  @Roles([RolesEnum.USER, RolesEnum.ADMIN])
  public createSource(
    @Args() data: SourceCreateDto,
    @AuthorizationParam('_id') user: string,
  ): Promise<SourceConfig> {
    return this.service.create(data.source, user);
  }

  @Mutation()
  @Roles([RolesEnum.USER, RolesEnum.ADMIN])
  @AccessControl(AccessControlModels.Source)
  public updateSource(
    @Args('id') id: string,
    @Args() { source }: SourceCreateDto,
  ): Promise<SourceConfig | null> {
    return this.service.update(id, source);
  }

  @Mutation()
  @Roles([RolesEnum.USER, RolesEnum.ADMIN])
  @AccessControl(AccessControlModels.Source)
  public deleteSource(
    @Args('id') id: string
  ): Promise<boolean> {
    return this.service.delete(id);
  }
}
