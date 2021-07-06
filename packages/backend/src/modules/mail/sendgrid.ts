import Sendgrid from '@sendgrid/mail';
import { MailService } from './abstract';

export type SendGridConfig = {
  apiKey: string;
  from: string;
  resetPasswordTemplateId: string;
  confirmationTemplateId: string;
  clientHost: string;
  publicHost: string;
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
      templateId: this.config.confirmationTemplateId,
      dynamicTemplateData: {
        confirmationUrl: `${this.config.publicHost}/user/confirm-email?code=${code}&email=${email}`,
        firstName,
      },
      hideWarnings: true,
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
      templateId: this.config.resetPasswordTemplateId,
      dynamicTemplateData: {
        resetPasswordUrl: `${this.config.clientHost}/reset-password?code=${code}&email=${email}`,
        firstName,
      },
      hideWarnings: true,
    });
  }
}
