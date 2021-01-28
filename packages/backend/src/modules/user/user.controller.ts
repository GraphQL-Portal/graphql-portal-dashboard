import {
  Controller,
  Get,
  Query,
  Redirect,
} from '@nestjs/common';
import { escape } from 'querystring';
import { config } from 'node-config-ts';
import ConfirmationCodeTypes from './enum/confirmation-code-types.enum';
import { LoggerService } from '../../common/logger';
import UserService from './user.service';

@Controller('user')
export default class UserController {
  public constructor(
    private readonly service: UserService,
    private readonly logger: LoggerService,
  ) { }

  @Get('/confirm-email')
  @Redirect('', 302)
  public async confirmEmail(@Query('email') email: string, @Query('code') code: string): Promise<{ url: string }> {
    const redirectUrl = `${config.client.host}/confirm-email`;
    try {
      await this.service.acceptConfirmationCode(email, ConfirmationCodeTypes.EMAIL_CONFIRMATION, code);
      return {
        url: `${redirectUrl}?result=success`
      };
    } catch (error) {
      this.logger.error(error, null, `${this.constructor.name}:${this.confirmEmail.name}`);
      return {
        url: `${redirectUrl}?result=failed&error=${escape(error.message)}`,
      };
    }
  }
}
