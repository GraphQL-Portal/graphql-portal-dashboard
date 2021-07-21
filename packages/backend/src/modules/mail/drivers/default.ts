import { logger } from '../../../common/logger';
import { Email } from '../emails';
import { MailService } from './mail';

export class DefaultMailService extends MailService {
  public constructor() {
    super();
    logger.warn(
      'You are running application without mail service. All redirect urls will be logged.',
      this.constructor.name
    );
  }

  public async send(email: Email): Promise<void> {
    logger.log(
      `Redirect url is ${email.redirectUrl}`,
      `${this.constructor.name}:${this.send.name}`
    );
  }
}
