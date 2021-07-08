import Sendgrid from '@sendgrid/mail';
import nodemailer from 'nodemailer';
import { SMTPMailService } from '../../modules/mail/smtp';
import { getHTML, Mail, subjects } from '../../modules/mail/common';
import { SendgridMailService } from '../../modules/mail/sendgrid';

const transport = { sendMail: jest.fn() };

jest.mock('@sendgrid/mail', () => ({
  setApiKey: jest.fn(),
  send: jest.fn(),
}));

jest.mock('nodemailer', () => ({
  createTransport: jest.fn(() => transport),
}));

describe('Mail', () => {
  const smtpConfig = {
    from: 'from-smtp',
    host: 'host',
    port: 587,
    auth: {
      user: 'user',
      pass: 'pass',
    },
    secure: false,
  };
  const sendgridConfig = {
    from: 'from-sendgrid',
    apiKey: 'apiKey',
  };
  const email = 'test@test.com';
  const firstName = 'test';
  const code = 'code';

  let sendgridMailService: SendgridMailService;
  let smtpMailService: SMTPMailService;

  afterEach(() => jest.clearAllMocks());

  describe('Common', () => {
    describe('getHTML', () => {
      it('should return correct confirmation email', () => {
        const confirmationUrl = 'https://confirmation.com';
        const firstName = 'firstName';
        const html = getHTML(Mail.CONFIRMATION, {
          confirmationUrl,
          firstName,
        });
        expect(html).toMatch(`href="${confirmationUrl}"`);
        expect(html).toMatch(`Hi ${firstName}`);
      });

      it('should return correct reset password email', () => {
        const resetPasswordUrl = 'https://reset-password.com';
        const firstName = 'firstName';
        const html = getHTML(Mail.RESET_PASSWORD, {
          resetPasswordUrl,
          firstName,
        });
        expect(html).toMatch(`href="${resetPasswordUrl}"`);
        expect(html).toMatch(`Hi ${firstName}`);
      });
    });
  });

  describe('SengridMailService', () => {
    describe('should setApiKey', () => {
      sendgridMailService = new SendgridMailService(sendgridConfig);

      expect(Sendgrid.setApiKey).toBeCalledTimes(1);
      expect(Sendgrid.setApiKey).toBeCalledWith(sendgridConfig.apiKey);
    });

    describe('sendEmailConfirmationCode', () => {
      it('should call send with correct args', async () => {
        await sendgridMailService.sendEmailConfirmationCode(
          email,
          firstName,
          code
        );

        expect(Sendgrid.send).toBeCalledTimes(1);
        expect(Sendgrid.send).toBeCalledWith({
          from: sendgridConfig.from,
          to: email,
          subject: subjects[Mail.CONFIRMATION],
          hideWarnings: true,
          html: expect.any(String),
        });
      });
    });

    describe('sendResetPasswordInstructions', () => {
      it('should set apiKey and call send with correct args', async () => {
        await sendgridMailService.sendResetPasswordInstructions(
          email,
          firstName,
          code
        );

        expect(Sendgrid.send).toBeCalledTimes(1);
        expect(Sendgrid.send).toBeCalledWith({
          from: sendgridConfig.from,
          to: email,
          subject: subjects[Mail.RESET_PASSWORD],
          hideWarnings: true,
          html: expect.any(String),
        });
      });
    });
  });

  describe('SMTPMailService', () => {
    describe('should create transport', () => {
      smtpMailService = new SMTPMailService(smtpConfig);

      expect(nodemailer.createTransport).toBeCalledTimes(1);
      expect(nodemailer.createTransport).toBeCalledWith(smtpConfig);
    });

    describe('sendEmailConfirmationCode', () => {
      it('should set apiKey and call send with correct args', async () => {
        await smtpMailService.sendEmailConfirmationCode(email, firstName, code);

        expect(transport.sendMail).toBeCalledTimes(1);
        expect(transport.sendMail).toBeCalledWith({
          from: smtpConfig.from,
          to: email,
          subject: subjects[Mail.CONFIRMATION],
          html: expect.any(String),
        });
      });
    });

    describe('sendResetPasswordInstructions', () => {
      it('should set apiKey and call send with correct args', async () => {
        await smtpMailService.sendResetPasswordInstructions(
          email,
          firstName,
          code
        );

        expect(transport.sendMail).toBeCalledTimes(1);
        expect(transport.sendMail).toBeCalledWith({
          from: smtpConfig.from,
          to: email,
          subject: subjects[Mail.RESET_PASSWORD],
          html: expect.any(String),
        });
      });
    });
  });
});
