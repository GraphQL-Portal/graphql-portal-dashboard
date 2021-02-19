import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { config } from 'node-config-ts';
import { IUserDocument } from 'src/data/schema/user.schema';
import UserService from '../../modules/user/user.service';
import Metadata from '../enum/metadata.enum';
import Roles from '../enum/roles.enum';
import { LoggerService } from '../logger';
import * as TokenTool from '../tool/token.tool';

@Injectable()
export default class AuthenticationMiddleware implements NestMiddleware {
  public constructor(
    private service: UserService,
    private logger: LoggerService
  ) {}

  public async use(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const context = `${this.constructor.name}:${this.use.name}`;
    try {
      if (!req.headers) return next();

      const token = TokenTool.getTokenFromHeaders(req.headers);
      if (!token) return next();

      const { userId } = await TokenTool.verify(token);

      let user = {} as IUserDocument | null;
      if (userId === Roles.GATEWAY) {
        if (token === config.gateway.secret) {
          user!.role = Roles.GATEWAY;
        }
      } else {
        user = await this.service.findById(userId);
      }

      (req as any)[Metadata.USER] = user;
      next();
    } catch (error) {
      this.logger.error(error, null, context);
      next();
    }
  }
}
