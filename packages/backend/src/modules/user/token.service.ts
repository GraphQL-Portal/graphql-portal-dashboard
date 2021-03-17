import { forwardRef, Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AuthenticationError } from 'apollo-server-express';
import { Model } from 'mongoose';
import { config } from 'node-config-ts';
import Roles from '../../common/enum/roles.enum';
import TokenExpirationTime from '../../common/enum/token-expiration-time.enum';
import { LoggerService } from '../../common/logger';
import * as jwt from '../../common/tool/token.tool';
import { ITokenDocument } from '../../data/schema/token.schema';
import ITokens from './interfaces/tokens.interface';
import UserService from './user.service';

@Injectable()
export default class TokenService implements OnModuleInit {
  public lastUpdateTime: number;

  public constructor(
    @InjectModel('Token') private tokenModel: Model<ITokenDocument>,
    private readonly logger: LoggerService,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService
  ) {}

  public async onModuleInit(): Promise<void> {
    const { jwtSecret } = config.application;
    if (!jwtSecret || jwtSecret === 'jwtSecret') {
      this.logger.warn('jwtSecret is not set', this.constructor.name);
    }
    await this.generateGatewaySecret();
  }

  public async refreshTokens(token: string, device: string): Promise<ITokens> {
    const context = `${this.constructor.name}:${this.refreshTokens.name}`;
    const refreshToken = await this.tokenModel.findOne({ token, device });
    const authError = new AuthenticationError('Refresh token is invalid'); // front-end relies on this error.message

    if (!refreshToken) {
      throw authError;
    }

    this.logger.log('Verifying token...', context);
    try {
      await jwt.verify(refreshToken.token);
    } catch (error) {
      this.logger.error(error, error.stack, context);
      throw authError;
    }

    return this.issueTokens(refreshToken.user, refreshToken.device);
  }

  public async issueTokens(userId: string, device: string): Promise<ITokens> {
    const context = `${this.constructor.name}:${this.issueTokens.name}`;

    const user = await this.userService.findById(userId);

    if (!user) {
      throw new AuthenticationError(
        'User with such email/password does not exist'
      );
    }

    const refreshToken = jwt.sign(user.role, userId, TokenExpirationTime.MONTH);
    const accessToken = jwt.sign(user.role, userId, TokenExpirationTime.DAY);

    this.logger.log('Deleting previous user tokens with device', context, {
      userId,
      device,
    });
    await this.tokenModel.deleteMany({ user: userId, device });

    this.logger.log('Creating new refresh token for device', context, {
      userId,
      device,
    });
    await this.tokenModel.create({ user: userId, token: refreshToken, device });

    return { refreshToken, accessToken };
  }

  public async generateGatewaySecret(): Promise<string> {
    if (config.gateway.secret) {
      try {
        if (jwt.verify(config.gateway.secret).userId === Roles.GATEWAY) {
          return config.gateway.secret;
        }
      } catch (error) {
        this.logger.error(
          `Could not verify the Gateway secret ${config.gateway.secret}`,
          '',
          this.constructor.name
        );
      }
    }

    const secret = jwt.sign(Roles.GATEWAY, Roles.GATEWAY, 0); // gateway secret should not expire
    this.logger.warn(
      `config.gateway.secret is not set, gateway routes won't be protected, please use generated secret: ${secret}`,
      this.constructor.name
    );

    return secret;
  }
}
