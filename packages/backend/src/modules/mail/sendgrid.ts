import Sendgrid from '@sendgrid/mail';
import {
  Mail,
  getHTML,
  getSubject,
  getConfirmationUrl,
  getResetPasswordUrl,
} from './common';
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

  public async sendEmailConfirmationCode(
    email: string,
    firstName: string,
    code: string
  ): Promise<void> {
    await this.sendgrid.send({
      from: this.config.from,
      to: email,
      subject: getSubject(Mail.CONFIRMATION),
      hideWarnings: true,
      html: getHTML(Mail.CONFIRMATION, {
        firstName,
        confirmationUrl: getConfirmationUrl(code, email),
      }),
    });
  }

  public async sendResetPasswordInstructions(
    email: string,
    firstName: string,
    code: string
  ): Promise<void> {
    await this.sendgrid.send({
      from: this.config.from,
      to: email,
      subject: getSubject(Mail.RESET_PASSWORD),
      hideWarnings: true,
      html: getHTML(Mail.RESET_PASSWORD, {
        firstName,
        resetPasswordUrl: getResetPasswordUrl(code, email),
      }),
    });
  }
}
