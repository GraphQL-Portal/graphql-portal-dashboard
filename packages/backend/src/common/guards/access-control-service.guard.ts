import {
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import PermissionTool from '../tool/permission.tool';
import Metadata from '../enum/metadata.enum';
import IAccessControlService from '../interface/access-control.interface';
import { AuthenticationError } from 'apollo-server-express';
import ApiDefService from 'src/modules/api-def/api-def.service';
import SourceService from 'src/modules/source/source.service';
import Roles from '../enum/roles.enum';
import AccessControlModels from '../enum/access-control-models.enum';

@Injectable()
export default class AccessControlGuard implements CanActivate {
  public constructor(
    private reflector: Reflector,
    private apiDefService: ApiDefService,
    private sourceService: SourceService,
  ) { }

  public getService(modelName: AccessControlModels): IAccessControlService {
    const modelToService = {
      ApiDef: this.apiDefService,
      Source: this.sourceService,
    }

    return modelToService[modelName];
  }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const access: { model: AccessControlModels, pathToId?: string } = this.reflector.get(Metadata.ACCESS, context.getHandler());
    if (!access) return true;

    const user = PermissionTool.getUserFromRequest(context);
    if (!user) throw new AuthenticationError('You do not have access to do this');
    if (user.role === Roles.ADMIN) return true;

    const service = this.getService(access.model);
    if (!service) throw new Error('Service is not defined');

    const id = PermissionTool.getIdFromGqlRequest(context, access.pathToId)
    if (!id) throw new Error('Id is not defined');

    const isOwner = await service.isOwner(user._id, id);
    if (!isOwner) throw new AuthenticationError('You do not have access to do this');

    return true;
  }
}
