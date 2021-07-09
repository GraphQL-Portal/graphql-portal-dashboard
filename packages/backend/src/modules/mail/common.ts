import { config } from 'node-config-ts';
import pupa from 'pupa';
import * as hmtlTemplates from './templates';

export enum Mail {
  RESET_PASSWORD,
  CONFIRMATION,
}
export const templates = {
  [Mail.RESET_PASSWORD]: hmtlTemplates.resetPasswordTemplate,
  [Mail.CONFIRMATION]: hmtlTemplates.confirmationTemplate,
};

export const subjects = {
  [Mail.RESET_PASSWORD]: 'Reset password on GraphQL Portal',
  [Mail.CONFIRMATION]: 'Account confirmation on GraphQL Portal',
};

export const getHTML = (
  template: Mail,
  vars: Record<string, unknown> = {}
): string => {
  if (!templates[template]) {
    throw new Error('Template is not defined');
  }
  return pupa(templates[template], vars);
};

export const getSubject = (template: Mail): string => {
  if (!subjects[template]) {
    throw new Error('Template is not defined');
  }
  return subjects[template];
};

export const getResetPasswordUrl = (code: string, email: string): string => {
  return `${config.client.host}/reset-password?code=${code}&email=${email}`;
};

export const getConfirmationUrl = (code: string, email: string): string => {
  return `${config.application.publicHost}/user/confirm-email?code=${code}&email=${email}`;
};
