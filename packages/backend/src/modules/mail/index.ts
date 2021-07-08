import { MailService } from './mail';
import { config } from 'node-config-ts';
import { SendgridMailService } from './sendgrid';
import { SMTPMailService } from './smtp';

let instance: MailService;

const getMailService = (): MailService => {
  if (instance) return instance;

  const { driver } = config.application.mail;

  if (driver === 'sendgrid') {
    instance = new SendgridMailService({
      apiKey: config.application.mail.sendgrid.apiKey,
      from: config.application.mail.from,
      clientHost: config.client.host,
      publicHost: config.application.publicHost,
    });
  } else if (driver === 'smtp') {
    instance = new SMTPMailService({
      from: config.application.mail.from,
      host: config.application.mail.smtp.host,
      port: Number.parseInt(config.application.mail.smtp.port),
      user: config.application.mail.smtp.user,
      pass: config.application.mail.smtp.pass,
      clientHost: config.client.host,
      publicHost: config.application.publicHost,
      secure: config.application.mail.smtp.secure,
      authMethod: config.application.mail.smtp.authMethod,
    });
  } else {
    throw new Error(`Unknown mail driver ${driver}`);
  }
  return instance;
};

export default getMailService;
