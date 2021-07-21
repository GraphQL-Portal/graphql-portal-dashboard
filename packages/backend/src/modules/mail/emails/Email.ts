import pupa from 'pupa';

export abstract class Email {
  public to: string;
  public html: string;
  public subject: string;
  // used for logging urls if mail service is not enabled, see class DefaultMailService
  public redirectUrl: string;

  protected template: string;

  public constructor(to: string, vars: Record<string, any>) {
    this.to = to;
    Object.defineProperty(this, 'html', {
      get: () => pupa(this.template, vars),
    });
  }
}
