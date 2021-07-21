import { Email } from '../emails/Email';

export abstract class MailService {
  public async send(email: Email): Promise<void> {
    throw new Error('Not implemented');
  }
}
