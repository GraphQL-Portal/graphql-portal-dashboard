import { confirmationTemplate } from '../templates';
import { Email } from './Email';

export type ConfirmationEmailVars = {
  firstName: string;
  redirectUrl: string;
};

export class ConfirmationEmail extends Email {
  public subject = 'Account confirmation on GraphQL Portal';
  protected template = confirmationTemplate;

  public constructor(to: string, vars: ConfirmationEmailVars) {
    super(to, vars);
    this.redirectUrl = vars.redirectUrl;
  }
}
