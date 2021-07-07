import * as templates from './templates';
const pupa = require('pupa');

export enum Template {
  RESET_PASSWORD,
  CONFIRMATION,
}

export type MailServiceConfig = {
  publicHost: string;
  clientHost: string;
};
export abstract class MailService {
  protected templates: { [key: string]: string } = {
    [Template.RESET_PASSWORD]: templates.resetPasswordTemplate,
    [Template.CONFIRMATION]: templates.confirmationTemplate,
  };

  protected publicHost: string;
  protected clientHost: string;

  public constructor(publicHost: string, clientHost: string) {
    this.publicHost = publicHost;
    this.clientHost = clientHost;
  }

  public async sendEmailConfirmationCode(
    email: string,
    firstName: string,
    code: string
  ): Promise<void> {
    throw new Error('Not implemented');
  }

  public async sendResetPasswordInstructions(
    email: string,
    firstName: string,
    code: string
  ): Promise<void> {
    throw new Error('Not implemented');
  }

  protected getHTML(
    template: Template,
    vars: Record<string, unknown> = {}
  ): string {
    if (!this.templates[template]) {
      throw new Error('Template is not defined');
    }
    return pupa(this.templates[template], vars);
  }

  protected getResetPasswordUrl(code: string, email: string): string {
    return `${this.clientHost}/reset-password?code=${code}&email=${email}`;
  }

  protected getConfirmationUrl(code: string, email: string): string {
    return `${this.publicHost}/user/confirm-email?code=${code}&email=${email}`;
  }
}
