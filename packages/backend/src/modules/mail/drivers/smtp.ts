import nodemailer, { Transporter } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { MailService } from './mail';
import { Email } from '../emails/Email';

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

  public async send(email: Email): Promise<void> {
    await this.transporter.sendMail({
      to: email.to,
      subject: email.subject,
      html: email.html,
      from: this.config.from,
    });
  }
}
