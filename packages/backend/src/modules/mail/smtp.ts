import nodemailer, { Transporter } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { MailService } from './abstract';

export type SMTPConfig = {
  from: string;
  host: string;
  port: number;
  user: string;
  pass: string;
};

export class SMTPMailService extends MailService {
  private readonly transporter: Transporter<SMTPTransport.SentMessageInfo>;

  public constructor(config: SMTPConfig) {
    super();
    this.transporter = nodemailer.createTransport({
      from: config.from,
      host: config.host,
      port: config.port,
      auth: {
        user: config.user,
        pass: config.pass,
      },
    });
  }

  public async sendEmailConfirmationCode(
    email: string,
    firstName: string,
    code: string
  ): Promise<void> {
    this.transporter.sendMail({
      to: email,
      subject: 'Email confirmation',
      html: this.getConfirmationCodeTemplate(email, firstName, code),
    });
  }

  public async sendResetPasswordInstructions(
    email: string,
    firstName: string,
    code: string
  ): Promise<void> {
    this.transporter.sendMail({
      to: email,
      subject: 'Reset password',
      html: this.getResetPasswordTemplate(email, firstName, code),
    });
  }

  private getConfirmationCodeTemplate(
    email: string,
    firstName: string,
    code: string
  ): string {
    return '';
  }

  private getResetPasswordTemplate(
    email: string,
    firstName: string,
    code: string
  ): string {
    return '';
  }
}
