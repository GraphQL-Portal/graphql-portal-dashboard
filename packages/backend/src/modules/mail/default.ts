import { config } from 'node-config-ts';
import { LoggerService } from '../../common/logger';
import { getConfirmationUrl, getResetPasswordUrl } from './common';
import { MailService } from './mail';

const logger = new LoggerService(config);

export class DefaultMailService extends MailService {
  public constructor() {
    super();
    logger.warn(
      'You are running application without mail service. All redirect urls will be logged.',
      this.constructor.name
    );
  }

  public async sendEmailConfirmationCode(
    email: string,
    firstName: string,
    code: string
  ): Promise<void> {
    logger.log(
      `Confirmation url is ${getConfirmationUrl(code, email)}`,
      `${this.constructor.name}:${this.sendEmailConfirmationCode.name}`
    );
  }

  public async sendResetPasswordInstructions(
    email: string,
    firstName: string,
    code: string
  ): Promise<void> {
    logger.log(
      `Reset password url is ${getResetPasswordUrl(code, email)}`,
      `${this.constructor.name}:${this.sendEmailConfirmationCode.name}`
    );
  }
}
