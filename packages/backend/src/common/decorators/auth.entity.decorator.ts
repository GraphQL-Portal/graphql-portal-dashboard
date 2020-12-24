import { createParamDecorator } from '@nestjs/common';
import { AuthenticationError } from 'apollo-server-express';
import PermissionTool from '../tool/permission.tool';

export default createParamDecorator((data, ctx) => {
  const user = PermissionTool.getUserFromRequest(ctx);

  if (!user) throw new AuthenticationError('User not found');
});