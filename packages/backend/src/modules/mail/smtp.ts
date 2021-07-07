import nodemailer, { Transporter } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { MailService, Template } from './mail';

export type SMTPConfig = {
  from: string;
  host: string;
  port: number;
  user: string;
  pass: string;
  clientHost: string;
  publicHost: string;
};

export class SMTPMailService extends MailService {
  private readonly transporter: Transporter<SMTPTransport.SentMessageInfo>;
  private readonly config: SMTPConfig;

  public constructor(config: SMTPConfig) {
    super(config.publicHost, config.clientHost);
    this.transporter = nodemailer.createTransport({
      host: config.host,
      port: config.port,
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
      subject: 'Account confirmation on GraphQL Portal',
      from: this.config.from,
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
    await this.transporter.sendMail({
      to: email,
      from: this.config.from,
      subject: 'Reset password on GraphQL Portal',
      html: this.getHTML(Template.RESET_PASSWORD, {
        firstName,
        resetPasswordUrl: this.getResetPasswordUrl(code, email),
      }),
    });
  }
}
