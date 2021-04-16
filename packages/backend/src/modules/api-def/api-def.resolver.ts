import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  AccessControl,
  AuthorizationEntity,
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
  @Roles([RolesEnum.USER])
  public publishApiDefsUpdated(): Promise<number> {
    return this.service.publishApiDefsUpdated();
  }

  @Query()
  @Roles([RolesEnum.ADMIN])
  public getAllApiDefs(): Promise<ApiDefsWithTimestamp> {
    return this.service.findAll();
  }

  @Query()
  @Roles([RolesEnum.GATEWAY])
  public getAllApiDefsForGateway(): Promise<ApiDefsWithTimestamp> {
    return this.service.findAllForGateway();
  }

  @Query()
  @Roles([RolesEnum.USER, RolesEnum.ADMIN])
  public getApiDefs(
    @AuthorizationParam('_id') userId: string
  ): Promise<ApiDefsWithTimestamp> {
    return this.service.findAllByUser(userId);
  }

  @Query()
  @Roles([RolesEnum.USER, RolesEnum.ADMIN])
  @AccessControl(AccessControlModels.ApiDef)
  public getApiDefById(@Args('id') id: string): Promise<IApiDef> {
    return this.service.findById(id);
  }

  @Mutation()
  @Roles([RolesEnum.USER, RolesEnum.ADMIN])
  public createApiDef(
    @Args() data: ApiDefCreateDto,
    @AuthorizationParam('_id') userId: string
  ): Promise<{ apiDef: IApiDef; schema: string }> {
    return this.service.create(data.apiDef, data.sources, userId);
  }

  @Mutation()
  @Roles([RolesEnum.USER])
  @AccessControl(AccessControlModels.ApiDef)
  public updateApiDef(
    @Args() data: ApiDefUpdateDto
  ): Promise<{ apiDef: IApiDef; schema: string }> {
    return this.service.update(
      data.id,
      { ...data.apiDef, enabled: data.enabled },
      data.sources
    );
  }

  @Mutation()
  @Roles([RolesEnum.USER])
  @AccessControl(AccessControlModels.ApiDef)
  public deleteApiDef(@Args('id') id: string): Promise<boolean> {
    return this.service.delete(id);
  }

  @Mutation()
  @Roles([RolesEnum.USER])
  public deleteApiDefByName(@Args('name') name: string): Promise<boolean> {
    return this.service.deleteByName(name);
  }
}
