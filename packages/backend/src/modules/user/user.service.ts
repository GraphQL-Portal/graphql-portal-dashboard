import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { config } from 'node-config-ts';
import { AuthenticationError } from 'apollo-server-express';
import { LoggerService } from '../../common/logger';
import { IUserDocument } from '../../data/schema/user.schema';
import IUser from '../../common/interface/user.interface';
import ITokens from './interfaces/tokens.interface';
import TokenService from '../user/token.service';
import Roles from '../../common/enum/roles.enum';

@Injectable()
export default class UserService {
  public lastUpdateTime: number;

  public constructor(
    @InjectModel('User') private userModel: Model<IUserDocument>,
    private readonly logger: LoggerService,
    private readonly tokenService: TokenService
  ) {}

  private async onModuleInit(): Promise<void> {
    await this.createDefaultUser();
  }

  public async login(email: string, password: string, device: string): Promise<ITokens> {
    const user = await this.userModel.findOne({ email });

    if (!user || !user.isValidPassword(password)) throw new AuthenticationError('Wrong email or password');

    const tokens = this.tokenService.issueTokens(user._id!, device);

    this.logger.log(`User with email: ${user.email} successfully logged in`, this.constructor.name);

    return tokens;
  }

  public async register(data: IUser, device: string): Promise<ITokens> {
    const user = await this.userModel.create(data);
    const tokens = this.tokenService.issueTokens(user._id!, device);

    this.logger.log(`Successfully created user with email: ${data.email}`, this.constructor.name);

    return tokens;
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
}
