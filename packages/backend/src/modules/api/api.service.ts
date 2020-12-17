import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { LoggerService } from '../../common/logger';
import { Model } from 'mongoose';
import IApi from '../../common/interface/api.interface';
import { IApiDocument } from '../../data/schema/api.schema';
import RedisService from '../redis/redis.service';

@Injectable()
export default class ApiService {
  public constructor(
    @InjectModel('Api') private apiModel: Model<IApiDocument>,
    private readonly logger: LoggerService,
    private readonly redisService: RedisService
  ) {}

  public findAll(): Promise<IApi[]> {
    return this.apiModel.find().populate('sources').lean().exec();
  }

  public async create(data: any): Promise<IApi> {
    const api = await this.apiModel.create(data);
    this.logger.log(`Created api ${data.name}`, this.constructor.name, data);
    this.redisService.publishApisUpdated();

    await api.populate('sources').execPopulate();
    return api.toObject();
  }

  public async delete(name: string): Promise<number> {
    const { deletedCount } = await this.apiModel.deleteOne({ name });
    this.logger.log(`Deleted api ${name}`, this.constructor.name);
    // if (deletedCount) {
    this.redisService.publishApisUpdated();
    // }

    return deletedCount;
  }
}
