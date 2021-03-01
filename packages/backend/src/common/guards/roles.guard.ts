import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import PermissionTool from '../tool/permission.tool';
import Metadata from '../enum/metadata.enum';
import { AuthenticationError } from 'apollo-server-express';
import Roles from '../enum/roles.enum';
import { config } from 'node-config-ts';

@Injectable()
export default class RolesGuard implements CanActivate {
  public constructor(private reflector: Reflector) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles: string[] = this.reflector.get<string[]>(
      Metadata.ROLES,
      context.getHandler()
    );
    if (!roles) return true;
    if (roles.includes(Roles.GATEWAY) && !config.gateway.secret) {
      return true;
    }

    const user = PermissionTool.getUserFromRequest(context);

    if (!user || user.deletedAt) throw new AuthenticationError('Unauthorized');

    const { role } = user;
    if (role === Roles.ADMIN) return true;

    if (!roles.includes(role))
      throw new AuthenticationError(
        `User role is: ${role}, but required one of: ${roles}`
      );

    return true;
  }
}
