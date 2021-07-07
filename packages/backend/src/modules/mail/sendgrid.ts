import Sendgrid from '@sendgrid/mail';
import { MailService, Template } from './mail';

export type SendGridConfig = {
  apiKey: string;
  from: string;
  clientHost: string;
  publicHost: string;
};

export class SendgridMailService extends MailService {
  private readonly sendgrid = Sendgrid;
  private readonly config: SendGridConfig;

  public constructor(config: SendGridConfig) {
    super(config.publicHost, config.clientHost);
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
      subject: 'Account confirmation on GraphQL Portal',
      hideWarnings: true,
      html: this.getHTML(Template.CONFIRMATION, {
        firstName,
        confirmationUrl: this.getConfirmationUrl(code, email),
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
      subject: 'Reset password on GraphQL Portal',
      hideWarnings: true,
      html: this.getHTML(Template.RESET_PASSWORD, {
        firstName,
        resetPasswordUrl: this.getResetPasswordUrl(code, email),
      }),
    });
  }
}
