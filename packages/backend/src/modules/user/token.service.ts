import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthenticationError } from 'apollo-server-express';
import { LoggerService } from '../../common/logger';
import * as jwt from '../../common/tool/token.tool';
import { ITokenDocument } from '../../data/schema/token.schema';
import ITokens from './interfaces/tokens.interface';
import TokenExpirationTime from '../../common/enum/token-expiration-time.enum';
import UserService from './user.service';

@Injectable()
export default class TokenService {
  public lastUpdateTime: number;

  public constructor(
    @InjectModel('Token') private tokenModel: Model<ITokenDocument>,
    private readonly logger: LoggerService,
    @Inject(forwardRef(() => UserService)) private readonly userService: UserService
  ) { }

  public async refreshTokens(token: string, device: string): Promise<ITokens> {
    const context = `${this.constructor.name}:${this.refreshTokens.name}`;
    const refreshToken = await this.tokenModel.findOne({ token, device });

    if (!refreshToken) {
      throw new AuthenticationError('Refresh token is invalid');
    }

    this.logger.log('Verifying token...', context);
    await jwt.verify(refreshToken.token);

    return this.issueTokens(refreshToken.user, refreshToken.device);
  }

  public async issueTokens(userId: string, device: string): Promise<ITokens> {
    const context = `${this.constructor.name}:${this.issueTokens.name}`;

    const user = await this.userService.findById(userId);

    if (!user) {
      throw new AuthenticationError('User with such email/password does not exist');
    }

    const refreshToken = jwt.sign(user.role, userId, TokenExpirationTime.MONTH);
    const accessToken = jwt.sign(user.role, userId, TokenExpirationTime.DAY);

    this.logger.log('Deleting previous user tokens with device', context, { userId, device });
    await this.tokenModel.deleteMany({ user: userId, device });

    this.logger.log('Creating new refresh token for device', context, { userId, device });
    await this.tokenModel.create({ user: userId, token: refreshToken, device });

    return { refreshToken, accessToken };
  }
}
