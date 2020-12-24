import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import UserService from '../../modules/user/user.service';
import Metadata from '../enum/metadata.enum';
import { LoggerService } from '../logger';
import * as TokenTool from '../tool/token.tool';

@Injectable()
export default class AuthenticationMiddleware implements NestMiddleware {

  constructor(private service: UserService, private logger: LoggerService) { }

  async use(req: Request, res: Response, next: NextFunction) {
    const context = `${this.constructor.name}:${this.use.name}`;
    try {
      if (!req.headers) return next();
      const token = TokenTool.getTokenFromHeaders(req.headers);

      this.logger.debug('Got token from headers', context);
      if (!token) return next();

      this.logger.debug('Verifying token', context, { token });
      const { userId } = await TokenTool.verify(token);

      this.logger.debug('Looking for user', context, { userId });
      const user = await this.service.findById(userId);

      this.logger.debug('Setting user to request', context, { email: user?.email });
      (req as any)[Metadata.USER] = user;
    } catch (error) {
      this.logger.error(error, null, context);
    } finally {
      next();
    }
  }
}