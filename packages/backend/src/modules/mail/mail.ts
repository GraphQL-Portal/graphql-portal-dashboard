export abstract class MailService {
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
}
