import { config } from 'node-config-ts';
import { boolean } from 'boolean';
import { MailService } from './mail';
import { SendgridMailService } from './sendgrid';
import { SMTPMailService } from './smtp';
import { DefaultMailService } from './default';
import { logger } from '../../common/logger';

let instance: MailService;

const context = 'MailService';

const getMailService = (): MailService => {
  if (instance) return instance;

  const { mail, sendgrid } = config.application;

  // TODO: remove deprecated sendgrid config in 1-2 versions
  const isDeprecatedSendgridUsed =
    Object.values(sendgrid).filter(Boolean).length > 0;
  if (mail.driver === 'sendgrid' || isDeprecatedSendgridUsed) {
    if (isDeprecatedSendgridUsed) {
      logger.warn(
        'config:application:sendgrid is deprecated, use config:application:mail instead',
        context
      );
    }

    instance = new SendgridMailService({
      apiKey: mail.sendgrid.apiKey || sendgrid.apiKey,
      from: mail.from || sendgrid.senderEmail,
    });
  } else if (mail.driver === 'smtp') {
    instance = new SMTPMailService({
      from: mail.from,
      ...mail.smtp,
      secure: boolean(mail.smtp.secure),
    });
  } else {
    instance = new DefaultMailService();
  }
  return instance;
};

export default getMailService;
