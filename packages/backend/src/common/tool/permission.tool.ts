import { ExecutionContext } from '@nestjs/common';
import Metadata from '../enum/metadata.enum';
import IUser from '../interface/user.interface';

export default class PermissionTool {
  public static getUserFromRequest(context: ExecutionContext): IUser | undefined {
    const request = context.switchToHttp().getRequest();
    return request && request[Metadata.USER];
  }
}
