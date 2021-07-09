import nodemailer, { Transporter } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { MailService } from './mail';
import {
  Mail,
  getHTML,
  getSubject,
  getConfirmationUrl,
  getResetPasswordUrl,
} from './common';

export type SMTPConfig = {
  from: string;
  host: string;
  port: number;
  auth: {
    user: string;
    pass: string;
  };
  secure: boolean;
};

export class SMTPMailService extends MailService {
  private readonly transporter: Transporter<SMTPTransport.SentMessageInfo>;
  private readonly config: SMTPConfig;

  public constructor(config: SMTPConfig) {
    super();
    this.transporter = nodemailer.createTransport(config);
    this.config = config;
  }

  public async sendEmailConfirmationCode(
    email: string,
    firstName: string,
    code: string
  ): Promise<void> {
    await this.transporter.sendMail({
      to: email,
      subject: getSubject(Mail.CONFIRMATION),
      from: this.config.from,
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
    await this.transporter.sendMail({
      to: email,
      from: this.config.from,
      subject: getSubject(Mail.RESET_PASSWORD),
      html: getHTML(Mail.RESET_PASSWORD, {
        firstName,
        resetPasswordUrl: getResetPasswordUrl(code, email),
      }),
    });
  }
}
