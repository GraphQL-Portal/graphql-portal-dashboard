import Sendgrid from '@sendgrid/mail';
import { Email } from '../emails/Email';
import { MailService } from './mail';

export type SendGridConfig = {
  apiKey: string;
  from: string;
};

export class SendgridMailService extends MailService {
  private readonly sendgrid = Sendgrid;
  private readonly config: SendGridConfig;

  public constructor(config: SendGridConfig) {
    super();
    this.sendgrid.setApiKey(config.apiKey);
    this.config = config;
  }

  public async send(email: Email): Promise<void> {
    await this.sendgrid.send({
      from: this.config.from,
      hideWarnings: true,
      to: email.to,
      subject: email.subject,
      html: email.html,
    });
  }
}
