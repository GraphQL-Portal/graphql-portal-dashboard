import { config } from 'node-config-ts';
import { boolean } from 'boolean';
import {
  SendgridMailService,
  SMTPMailService,
  DefaultMailService,
  MailService,
} from './drivers';
import { logger } from '../../common/logger';

export let mailService: MailService;

const context = 'MailService';

const getMailService = (): MailService => {
  if (mailService) return mailService;

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

    mailService = new SendgridMailService({
      apiKey: mail.sendgrid.apiKey || sendgrid.apiKey,
      from: mail.from || sendgrid.senderEmail,
    });
  } else if (mail.driver === 'smtp') {
    mailService = new SMTPMailService({
      from: mail.from,
      ...mail.smtp,
      secure: boolean(mail.smtp.secure),
    });
  } else {
    mailService = new DefaultMailService();
  }
  return mailService;
};

getMailService();
