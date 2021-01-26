import { Test, TestingModule } from '@nestjs/testing';
import * as mongoose from 'mongoose';
import { config } from 'node-config-ts';
import Roles from '../../common/enum/roles.enum';
import { randomEmail, randomString } from '../../common/tool';
import UserService from '../../modules/user/user.service';
import TokenService from '../../modules/user/token.service';
import AppModule from '../../modules/app.module';
import { IUserDocument } from '../../data/schema/user.schema';
import ITokens from '../../modules/user/interfaces/tokens.interface';
import { createUser, randomObjectId } from '../common';
import { CodeTypes } from '../../modules/user/enum';

jest.useFakeTimers();

jest.mock('ioredis');

jest.mock('@sendgrid/mail', () => ({
  setApiKey: jest.fn(),
  send: jest.fn(),
}));

describe('UserService', () => {
  let app: TestingModule;
  let userService: UserService;
  let tokenService: TokenService;
  let user: IUserDocument;

  const codeEntity = { code: 'code' };

  beforeAll(async () => {
    app = await Test.createTestingModule({ imports: [AppModule] }).compile();
    await Promise.all(mongoose.connections.map((c) => c.db?.dropDatabase()));

    userService = app.get<UserService>(UserService);
    tokenService = app.get<TokenService>(TokenService);
  });

  afterAll(async () => {
    await app.close();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  describe('register', () => {
    const device = 'device';
    const password = 'Secret123';
    const tokens: ITokens = {
      accessToken: randomString(),
      refreshToken: randomString(),
    };
    const registrationData = {
      firstName: 'firstName',
      lastName: 'lastName',
      email: randomEmail(),
      role: Roles.USER,
      password,
    };

    it('creates user', async () => {
      const spySendCode = jest.spyOn(userService, 'sendEmailConfirmationCode').mockResolvedValue();
      await userService.register(registrationData);

      expect(spySendCode).toBeCalledTimes(1);
    });

    describe('login', () => {
      it('throws error on invalid credentials', async () => {
        const spyisEmailNotConfirmed = jest.spyOn(userService, 'isEmailNotConfirmed').mockResolvedValue(false);
        await expect(userService.login('invalid@email.com', 'password123', device)).rejects.toThrow(
          'Wrong email or password'
        );
        expect(spyisEmailNotConfirmed).toBeCalledTimes(1);
      });

      it('returns token', async () => {
        const spyisEmailNotConfirmed = jest.spyOn(userService, 'isEmailNotConfirmed').mockResolvedValue(false);
        const spyRefreshTokens = jest.spyOn(tokenService, 'issueTokens').mockResolvedValue(tokens);
        const result = await userService.login(registrationData.email, password, device);

        expect(result).toMatchObject(tokens);
        expect(spyisEmailNotConfirmed).toBeCalledTimes(1);
        expect(spyRefreshTokens).toBeCalledTimes(1);
      });
      it('throws error on unconfirmed email and sends confirmation again', async () => {
        const spyisEmailNotConfirmed = jest.spyOn(userService, 'isEmailNotConfirmed').mockResolvedValue(true);
        const spySendCode = jest.spyOn(userService, 'sendEmailConfirmationCode').mockResolvedValue();
        const spyRefreshTokens = jest.spyOn(tokenService, 'issueTokens').mockResolvedValue(tokens);
        await expect(userService.login(registrationData.email, password, device))
          .rejects.toThrow('We have sent a confirmation to you. Confirm your email address, please.');

        expect(spyRefreshTokens).toBeCalledTimes(0);
        expect(spyisEmailNotConfirmed).toBeCalledTimes(1);
        expect(spyisEmailNotConfirmed).toBeCalledWith(registrationData.email);
        expect(spySendCode).toBeCalledTimes(1);
        expect(spySendCode).toBeCalledWith(registrationData.email);
      });
    });

    describe('findByEmail', () => {
      let id: string;
      const expectUser = (data: IUserDocument): void => {
        expect(data).toMatchObject({
          ...registrationData,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
          password: expect.any(String),
        });
      };

      it('should return user', async () => {
        user = (await userService.findByEmail(registrationData.email))!;

        expect(user).toBeDefined();
        expectUser(user);
        id = user._id!;
      });

      it('should return null', async () => {
        const user = await userService.findByEmail(randomEmail());

        expect(user).toBeNull();
      });

      describe('findById', () => {
        it('should return user', async () => {
          const user = (await userService.findById(id))!;

          expect(user).toBeDefined();
          expectUser(user);
        });

        it('should return null', async () => {
          const user = await userService.findById(randomObjectId());

          expect(user).toBeNull();
        });
      });

      describe('getUsers', () => {
        let adminId: string;

        beforeAll(async () => {
          adminId = (await createUser(userService, Roles.ADMIN))._id!;
        });

        it('should return user', async () => {
          const users = await userService.getUsers(adminId);

          expect(users).toBeDefined();
          expect(users).toHaveLength(1);
          expect(!users.some(({ _id }) => _id === adminId)).toBeTruthy();
        });
      });
    });
  });

  describe('resetPassword', () => {

    it('resetPasswordRequest', async () => {
      const spyFindByEmail = jest.spyOn(userService, 'findByEmail').mockResolvedValue(user);
      const spyCreateNewCodeAndDeletePrevious = jest.spyOn(userService as any, 'createNewCodeAndDeletePrevious').mockResolvedValue(codeEntity);
      const spySendgridSend = jest.spyOn((userService as any).sendgrid, 'send').mockImplementation(() => { });

      await userService.resetPasswordRequest(user.email);

      expect(spyFindByEmail).toBeCalledTimes(1);
      expect(spyFindByEmail).toBeCalledWith(user.email);
      expect(spyCreateNewCodeAndDeletePrevious).toBeCalledTimes(1);
      expect(spyCreateNewCodeAndDeletePrevious).toBeCalledWith(user.email, CodeTypes.RESET_PASSWORD);
      expect(spySendgridSend).toBeCalledTimes(1);
      expect(spySendgridSend).toBeCalledWith(
        {
          from: config.application.sendgrid.senderEmail,
          to: user.email,
          templateId: config.application.sendgrid.resetPasswordTemplateId,
          dynamicTemplateData: {
            resetPasswordUrl: `${config.client.host}/reset-password?code=${codeEntity.code}&email=${user.email}`,
            firstName: user.firstName,
          }
        }
      );
    });

    it('resetPassword: success', async () => {
      const password = 'newpassword';
      const mockedUser = {
        save: jest.fn(),
      };
      const spyIsConfirmed = jest.spyOn(userService, 'acceptConfirmationCode').mockResolvedValue(true);
      const spyFindByEmail = jest.spyOn(userService, 'findByEmail').mockResolvedValue(mockedUser as any);

      await userService.resetPassword(user.email, codeEntity.code, password);

      expect(spyIsConfirmed).toBeCalledTimes(1);
      expect(spyIsConfirmed).toBeCalledWith(user.email, CodeTypes.RESET_PASSWORD, codeEntity.code);
      expect(spyFindByEmail).toBeCalledTimes(1);
      expect(spyFindByEmail).toBeCalledWith(user.email);
      expect(mockedUser.save).toBeCalledTimes(1);
    });

    it('resetPassword: fail', async () => {
      const password = 'newpassword';
      const spyIsConfirmed = jest.spyOn(userService, 'acceptConfirmationCode').mockResolvedValue(false);
      const spyFindByEmail = jest.spyOn(userService, 'findByEmail').mockImplementation();

      await expect(userService.resetPassword(user.email, codeEntity.code, password)).rejects.toThrow('Confirmation code was not found');

      expect(spyIsConfirmed).toBeCalledTimes(1);
      expect(spyIsConfirmed).toBeCalledWith(user.email, CodeTypes.RESET_PASSWORD, codeEntity.code);
      expect(spyFindByEmail).toBeCalledTimes(0);
    });
  });

  describe('acceptConfirmationCode', () => {
    it('returns false if code entity was not found', async () => {
      await expect(userService.acceptConfirmationCode('email', CodeTypes.RESET_PASSWORD, 'code')).resolves.toBeFalsy();
    });

    it('returns true and delete all codes if code entity was found', async () => {
      const email = 'email';
      const code = 'code';
      const type = CodeTypes.RESET_PASSWORD;
      const spyFind = jest.spyOn((userService as any).codeModel, 'findOne').mockResolvedValue(true);
      const spyDelete = jest.spyOn((userService as any).codeModel, 'deleteMany').mockImplementation();

      await expect(userService.acceptConfirmationCode('email', type, 'code')).resolves.toBeTruthy();

      expect(spyFind).toBeCalledTimes(1);
      expect(spyFind).toBeCalledWith({
        code,
        email,
        type,
        expiredAt: {
          $gte: expect.any(Date),
        }
      });
      expect(spyDelete).toBeCalledTimes(1);
      expect(spyDelete).toBeCalledWith({
        email, type
      });
    });
  });

  describe('Confirm email', () => {
    it('throws error if user does not exist', async () => {
      const spyFindByEmail = jest.spyOn(userService, 'findByEmail').mockResolvedValue(null);
      await expect(userService.sendEmailConfirmationCode(user.email)).rejects.toThrow('User with this email does not exist');
      expect(spyFindByEmail).toBeCalledTimes(1);
      expect(spyFindByEmail).toBeCalledWith(user.email);
    });
    it('should create code and send it', async () => {
      const spyCreate = jest.spyOn((userService as any), 'createNewCodeAndDeletePrevious').mockResolvedValue(codeEntity);
      const spySendgridSend = jest.spyOn((userService as any).sendgrid, 'send').mockImplementation(() => { });
      await userService.sendEmailConfirmationCode(user.email);

      expect(spyCreate).toBeCalledTimes(1);
      expect(spyCreate).toBeCalledWith(user.email, CodeTypes.EMAIL_CONFIRMATION);
      expect(spySendgridSend).toBeCalledTimes(1);
      expect(spySendgridSend).toBeCalledWith({
        from: config.application.sendgrid.senderEmail,
        to: user.email,
        templateId: config.application.sendgrid.confirmationTemplateId,
        dynamicTemplateData: {
          confirmationUrl: `${config.application.host}/user/confirm-email?code=${codeEntity.code}&email=${user.email}`,
          firstName: user.firstName,
        }
      });
    });
  });
});
