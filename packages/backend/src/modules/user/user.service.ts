import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthenticationError } from 'apollo-server-express';
import { LoggerService } from '../../common/logger';
import { IUserDocument } from '../../data/schema/user.schema';
import IUser from '../../common/interface/user.interface';
import * as jwt from '../../common/tool/token.tool';

@Injectable()
export default class UserService {
  public lastUpdateTime: number;

  public constructor(
    @InjectModel('User') private userModel: Model<IUserDocument>,
    private readonly logger: LoggerService,
  ) { }

  public async login(email: string, password: string): Promise<string> {
    const user = await this.userModel.findOne({ email });

    if (!user || !user.isValidPassword(password)) throw new AuthenticationError('Wrong email or password');

    const token = jwt.sign(user._id!);

    this.logger.log(`User with email: ${user.email} successfully logged in`, this.constructor.name);

    return token;
  }

  public async register(data: IUser): Promise<string> {
    const user = await this.userModel.create(data);

    const token = jwt.sign(user._id!);

    this.logger.log(`Successfully created user with email: ${data.email}`, this.constructor.name);

    return token;
  }

  public async findById(id: string): Promise<IUserDocument | null> {
    return this.userModel.findById(id);
  }

  public async findByEmail(email: string): Promise<IUserDocument | null> {
    return this.userModel.findOne({ email });
  }
}
