import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import Sendgrid from '@sendgrid/mail';
import { Model } from 'mongoose';
import { config } from 'node-config-ts';
import { AuthenticationError, UserInputError } from 'apollo-server-express';
import { LoggerService } from '../../common/logger';
import { IUserDocument } from '../../data/schema/user.schema';
import { IConfirmationCodeDocument } from '../../data/schema/confirmation-code.schema';
import IUser from '../../common/interface/user.interface';
import ITokens from './interfaces/tokens.interface';
import TokenService from '../user/token.service';
import Roles from '../../common/enum/roles.enum';
import { CodeTypes, CodeExpirationTime } from './enum';

@Injectable()
export default class UserService {
  private readonly sendgrid = Sendgrid;

  public constructor(
    @InjectModel('User') private userModel: Model<IUserDocument>,
    @InjectModel('ConfirmationCode') private codeModel: Model<IConfirmationCodeDocument>,
    private readonly logger: LoggerService,
    private readonly tokenService: TokenService,
  ) {

    this.sendgrid.setApiKey(config.application.sendgrid.apiKey);
  }

  private async onModuleInit(): Promise<void> {
    await this.createDefaultUser();
  }

  public async login(email: string, password: string, device: string): Promise<ITokens> {
    const user = await this.userModel.findOne({ email });

    if (!(await this.isEmailConfirmed(email))) {
      await this.sendEmailConfirmationCode(email);
      throw new AuthenticationError('We have sent a confirmation to you. Confirm your email address, please.');
    };

    if (!user || !user.isValidPassword(password)) throw new AuthenticationError('Wrong email or password');

    const tokens = await this.tokenService.issueTokens(user._id!, device);

    this.logger.log(`User with email: ${user.email} successfully logged in`, this.constructor.name);

    return tokens;
  }

  public async register(data: IUser): Promise<boolean> {
    const user = await this.userModel.create(data);

    await this.sendEmailConfirmationCode(user.email);

    this.logger.log(`Successfully created user with email: ${data.email}`, this.constructor.name);

    return true;
  }

  public async findById(id: string): Promise<IUserDocument | null> {
    return this.userModel.findById(id);
  }

  public async findByEmail(email: string): Promise<IUserDocument | null> {
    return this.userModel.findOne({ email });
  }

  public async createDefaultUser(): Promise<void> {
    const toCreate = await this.userModel.findOne({ email: config.application.defaultAdmin.email });

    if (!toCreate) {
      await this.userModel.create({
        email: config.application.defaultAdmin.email,
        password: config.application.defaultAdmin.password,
        role: Roles.ADMIN,
      });
    }
  }

  public async getUsers(exceptUser: string): Promise<IUserDocument[]> {
    return this.userModel.find({
      _id: { $ne: exceptUser },
    });
  }

  public async resetPasswordRequest(email: string): Promise<boolean> {
    const user = await this.findByEmail(email);
    if (!user) {
      throw new UserInputError(`User with this email does not exist`);
    }

    const codeEntity = await this.createNewCodeAndDeletePrevious(email, CodeTypes.RESET_PASSWORD);

    await this.sendgrid.send(
      {
        from: config.application.sendgrid.senderEmail,
        to: email,
        templateId: config.application.sendgrid.resetPasswordTemplateId,
        dynamicTemplateData: {
          resetPasswordUrl: `${config.client.host}/reset-password?code=${codeEntity.code}&email=${email}`,
          firstName: user.firstName || user.email,
        }
      }
    );

    return true;
  }

  public async resetPassword(email: string, code: string, password: string): Promise<boolean> {
    const isConfirmed = await this.acceptConfirmationCode(email, CodeTypes.RESET_PASSWORD, code);
    if (!isConfirmed) throw new UserInputError('Confirmation code was not found');

    await this.userModel.updateOne({ email }, { password });

    return true;
  }

  public async sendEmailConfirmationCode(email: string): Promise<void> {
    const user = await this.findByEmail(email);
    if (!user) {
      throw new UserInputError(`User with this email does not exist`);
    }

    const codeEntity = await this.createNewCodeAndDeletePrevious(email, CodeTypes.EMAIL_CONFIRMATION);

    await this.sendgrid.send(
      {
        from: config.application.sendgrid.senderEmail,
        to: email,
        templateId: config.application.sendgrid.confirmationTemplateId,
        dynamicTemplateData: {
          confirmationUrl: `${config.application.host}/user/confirm-email?code=${codeEntity.code}&email=${email}`,
          firstName: user.firstName || email,
        }
      }
    );
  }

  public async isEmailConfirmed(email: string): Promise<boolean> {
    return (!this.codeModel.findOne({
      email,
      type: CodeTypes.EMAIL_CONFIRMATION
    }));
  }

  private async createNewCodeAndDeletePrevious(email: string, type: CodeTypes): Promise<IConfirmationCodeDocument> {
    await this.codeModel.deleteMany({
      email,
      type
    });

    return this.codeModel.create({
      email,
      type,
      expiredAt: new Date(Date.now() + CodeExpirationTime[type])
    });
  }

  public async acceptConfirmationCode(email: string, type: CodeTypes, code: string): Promise<boolean> {
    const context = `${this.constructor.name}:${this.acceptConfirmationCode.name}`;
    this.logger.debug('Looking for confirmation code', context, { email, code, type });
    const confirmationCode = await this.codeModel.findOne({
      code,
      email,
      type,
      expiredAt: {
        $gte: new Date(),
      }
    });
    if (!confirmationCode) {
      this.logger.debug('Confirmation code was not found', context, { email, code });
      return false;
    };
    await this.codeModel.deleteMany({
      email,
      type,
    });
    return true;
  }
}
