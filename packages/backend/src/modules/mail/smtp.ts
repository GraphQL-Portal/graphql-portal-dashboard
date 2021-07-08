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
  user: string;
  pass: string;
  secure: boolean;
  authMethod: string;
};

export class SMTPMailService extends MailService {
  private readonly transporter: Transporter<SMTPTransport.SentMessageInfo>;
  private readonly config: SMTPConfig;

  public constructor(config: SMTPConfig) {
    super();
    this.transporter = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.secure,
      authMethod: config.authMethod,
      auth: {
        user: config.user,
        pass: config.pass,
      },
    });
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
