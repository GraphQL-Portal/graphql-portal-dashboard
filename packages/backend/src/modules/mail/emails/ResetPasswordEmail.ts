import { resetPasswordTemplate } from '../templates';
import { Email } from './Email';

export type ResetPassworEmailVars = {
  firstName: string;
  redirectUrl: string;
};

export class ResetPasswordEmail extends Email {
  public subject = 'Reset password on GraphQL Portal';
  protected template = resetPasswordTemplate;

  public constructor(to: string, vars: ResetPassworEmailVars) {
    super(to, vars);
    this.redirectUrl = vars.redirectUrl;
  }
}
