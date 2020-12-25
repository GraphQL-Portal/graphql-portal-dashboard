import {
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import PermissionTool from '../tool/permission.tool';
import Metadata from '../enum/metadata.enum';
import { AuthenticationError } from 'apollo-server-express';

@Injectable()
export default class RolesGuard implements CanActivate {
  public constructor(private reflector: Reflector) { }

  public async canActivate(context: ExecutionContext): Promise<boolean> {

    const roles: string[] = this.reflector.get<string[]>(Metadata.ROLES, context.getHandler());
    if (!roles) return true;

    const user = PermissionTool.getUserFromRequest(context);
    if (!user) throw new AuthenticationError('User not found');

    if (!roles.includes(user.role)) throw new AuthenticationError(`User role is: ${user.role}, but required one of: ${roles}`);

    return true;
  }
}
