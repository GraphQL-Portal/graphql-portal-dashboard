import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import UserService from '../../modules/user/user.service';
import Metadata from '../enum/metadata.enum';
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
      (req as any)[Metadata.USER] = await this.service.findById(userId);
      next();
    } catch (error) {
      this.logger.error(error, null, context);
      next();
    }
  }
}
