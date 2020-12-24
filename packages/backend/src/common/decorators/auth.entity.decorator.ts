import { createParamDecorator } from '@nestjs/common';
import { AuthenticationError } from 'apollo-server-express';
import { IUserDocument } from 'src/data/schema/user.schema';
import PermissionTool from '../tool/permission.tool';

export default createParamDecorator((data, ctx): IUserDocument => {
  const user = PermissionTool.getUserFromRequest(ctx);

  if (!user) throw new AuthenticationError('User not found');

  return user;
});