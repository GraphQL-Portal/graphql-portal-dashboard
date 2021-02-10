import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  AccessControl,
  AuthorizationParam,
  Roles,
} from '../../common/decorators';
import AccessControlModels from '../../common/enum/access-control-models.enum';
import RolesEnum from '../../common/enum/roles.enum';
import IApiDef from '../../common/interface/api-def.interface';
import ApiDefService, { ApiDefsWithTimestamp } from './api-def.service';
import ApiDefCreateDto from './dto/api-def-create.dto';
import ApiDefUpdateDto from './dto/api-def-update.dto';

@Resolver('ApiDef')
export default class ApiDefResolver {
  public constructor(private readonly service: ApiDefService) {}

  @Query()
  @Roles([RolesEnum.USER, RolesEnum.ADMIN])
  public publishApiDefsUpdated(): Promise<number> {
    return this.service.publishApiDefsUpdated();
  }

  @Query()
  @Roles([RolesEnum.ADMIN, RolesEnum.GATEWAY])
  public getAllApiDefs(): Promise<ApiDefsWithTimestamp> {
    return this.service.findAll();
  }

  @Query()
  @Roles([RolesEnum.USER, RolesEnum.ADMIN])
  public getApiDefs(
    @AuthorizationParam('_id') userId: string
  ): Promise<ApiDefsWithTimestamp> {
    return this.service.findAllByUser(userId);
  }

  @Mutation()
  @Roles([RolesEnum.USER, RolesEnum.ADMIN])
  public createApiDef(
    @Args() data: ApiDefCreateDto,
    @AuthorizationParam('_id') userId: string
  ): Promise<IApiDef> {
    return this.service.create(data.apiDef, data.sources, userId);
  }

  @Mutation()
  @Roles([RolesEnum.USER, RolesEnum.ADMIN])
  @AccessControl(AccessControlModels.ApiDef)
  public updateApiDef(@Args() data: ApiDefUpdateDto): Promise<IApiDef | null> {
    return this.service.update(data.id, data.apiDef, data.sources);
  }

  @Mutation()
  @Roles([RolesEnum.USER, RolesEnum.ADMIN])
  @AccessControl(AccessControlModels.ApiDef)
  public deleteApiDef(@Args('id') id: string): Promise<boolean> {
    return this.service.delete(id);
  }
}
