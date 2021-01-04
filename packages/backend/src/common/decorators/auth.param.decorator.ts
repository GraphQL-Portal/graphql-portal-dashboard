import { createParamDecorator } from '@nestjs/common';
import { AuthenticationError, ValidationError } from 'apollo-server-express';
import PermissionTool from '../tool/permission.tool';

export default createParamDecorator((param: string, ctx): any => {
  const user = PermissionTool.getUserFromRequest(ctx);
  if (!user) throw new AuthenticationError('Unauthorized');

  const prop = (user as any)[param];
  if (!prop) throw new ValidationError(`${param} is not defined`);

  return prop;
});