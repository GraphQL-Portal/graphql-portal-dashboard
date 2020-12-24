import { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { IUserDocument } from 'src/data/schema/user.schema';
import Metadata from '../enum/metadata.enum';

export default class PermissionTool {
  public static getUserFromRequest(context: ExecutionContext): IUserDocument | undefined {
    const httpRequest = context.switchToHttp().getRequest();

    const gqlRequest = GqlExecutionContext.create(context).getContext().req;

    return (httpRequest || gqlRequest)[Metadata.USER];
  }
}
