import { BadGatewayException, Injectable, NestMiddleware } from '@nestjs/common';
import { ObjectTypeDefinitionFactory } from '@nestjs/graphql/dist/schema-builder/factories/object-type-definition.factory';
import { NextFunction } from 'express';
import AuthService from '../../modules/auth/auth.service';
import Metadata from '../enum/metadata.enum';
import * as TokenTool from '../tool/token.tool';

@Injectable()
export default class AuthenticationMiddleware implements NestMiddleware {

  constructor(private service: AuthService) { }

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.headers) return next();
      const token = TokenTool.getTokenFromHeaders(req.headers);
      if (!token) return next();
      const { userId } = await TokenTool.verify(token);
      const user = await this.service.findById(userId);
      (req as any)[Metadata.USER] = user;
      next();
    } catch (e) {
      return next();
    }
  }
}