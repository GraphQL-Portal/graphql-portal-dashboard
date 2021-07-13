import Sendgrid from '@sendgrid/mail';
import nodemailer from 'nodemailer';
import {
  ConfirmationEmail,
  ResetPasswordEmail,
  Email,
  SMTPMailService,
  SendgridMailService,
} from '../../modules/mail';

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
  const redirectUrl = 'http://redirect.com';
  const firstName = 'test';
  const emailEntity: Email = {
    html: 'html',
    to: 'to',
    subject: 'subject',
  } as any;

  let sendgridMailService: SendgridMailService;
  let smtpMailService: SMTPMailService;

  afterEach(() => jest.clearAllMocks());

  describe('Common', () => {
    describe('ConfirmationEmail', () => {
      it('should return correct html of confirmation email', () => {
        const { html, to, subject } = new ConfirmationEmail(email, {
          firstName,
          redirectUrl,
        });
        expect(html).toMatch(`href="${redirectUrl}"`);
        expect(html).toMatch(`Hi ${firstName}`);
        expect(to).toBe(email);
        expect(subject).toBeDefined();
      });

      it('should return correct html of reset password email', () => {
        const { html, to, subject } = new ResetPasswordEmail(email, {
          firstName,
          redirectUrl,
        });
        expect(html).toMatch(`href="${redirectUrl}"`);
        expect(html).toMatch(`Hi ${firstName}`);
        expect(to).toBe(email);
        expect(subject).toBeDefined();
      });
    });
  });

  describe('SengridMailService', () => {
    describe('should setApiKey', () => {
      sendgridMailService = new SendgridMailService(sendgridConfig);

      expect(Sendgrid.setApiKey).toBeCalledTimes(1);
      expect(Sendgrid.setApiKey).toBeCalledWith(sendgridConfig.apiKey);
    });

    describe('send', () => {
      it('should call send with correct args', async () => {
        await sendgridMailService.send(emailEntity);

        expect(Sendgrid.send).toBeCalledTimes(1);
        expect(Sendgrid.send).toBeCalledWith({
          from: sendgridConfig.from,
          hideWarnings: true,
          to: emailEntity.to,
          subject: emailEntity.subject,
          html: emailEntity.html,
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

    describe('send', () => {
      it('should call send with correct args', async () => {
        await smtpMailService.send(emailEntity);

        expect(transport.sendMail).toBeCalledTimes(1);
        expect(transport.sendMail).toBeCalledWith({
          from: smtpConfig.from,
          to: emailEntity.to,
          subject: emailEntity.subject,
          html: emailEntity.html,
        });
      });
    });
  });
});
