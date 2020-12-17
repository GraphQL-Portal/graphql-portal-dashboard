import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { LoggerService } from '../../common/logger';
import { Model } from 'mongoose';
import IApiDef from '../../common/interface/api-def.interface';
import { IApiDefDocument } from '../../data/schema/api-def.schema';
import RedisService from '../redis/redis.service';

@Injectable()
export default class ApiDefService {
  public constructor(
    @InjectModel('ApiDef') private apiModel: Model<IApiDefDocument>,
    private readonly logger: LoggerService,
    private readonly redisService: RedisService
  ) {}

  public findAll(): Promise<IApiDef[]> {
    return this.apiModel.find().populate('sources').lean().exec();
  }

  public async create(data: any): Promise<IApiDef> {
    const apiDef = await this.apiModel.create(data);
    this.logger.log(`Created apiDef ${data.name}`, this.constructor.name, data);
    this.redisService.publishApiDefsUpdated();

    await apiDef.populate('sources').execPopulate();
    return apiDef.toObject();
  }

  public async delete(name: string): Promise<number> {
    const { deletedCount } = await this.apiModel.deleteOne({ name });
    this.logger.log(`Deleted apiDef ${name}`, this.constructor.name);
    if (deletedCount) {
      this.redisService.publishApiDefsUpdated();
    }

    return deletedCount;
  }
}
