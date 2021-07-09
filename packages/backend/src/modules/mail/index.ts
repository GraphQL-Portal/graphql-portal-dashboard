import { MailService } from './mail';
import { config } from 'node-config-ts';
import { SendgridMailService } from './sendgrid';
import { SMTPMailService } from './smtp';
import { DefaultMailService } from './default';

let instance: MailService;

const getMailService = (): MailService => {
  if (instance) return instance;

  const { driver } = config.application.mail;

  if (driver === 'sendgrid') {
    // config.application.sendgrid used for backward compatibility, have to remove later
    instance = new SendgridMailService({
      apiKey:
        config.application.mail.sendgrid.apiKey ||
        config.application.sendgrid.apiKey,
      from:
        config.application.mail.from || config.application.sendgrid.senderEmail,
      clientHost: config.client.host,
      publicHost: config.application.publicHost,
    });
  } else if (driver === 'smtp') {
    instance = new SMTPMailService({
      from: config.application.mail.from,
      ...config.application.mail.smtp,
    });
  } else {
    instance = new DefaultMailService();
  }
  return instance;
};

export default getMailService;
