import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import IApiDef from '../../common/interface/api-def.interface';
import { LoggerService } from '../../common/logger';
import { IApiDefDocument } from '../../data/schema/api-def.schema';
import RedisService from '../redis/redis.service';

export type ApiDefsWithTimestamp = { apiDefs: IApiDef[]; timestamp: number };

@Injectable()
export default class ApiDefService {
  public lastUpdateTime: number;

  public constructor(
    @InjectModel('ApiDef') private apiDefModel: Model<IApiDefDocument>,
    private readonly logger: LoggerService,
    private readonly redisService: RedisService
  ) {
    this.setLastUpdateTime();
  }

  public async findAll(): Promise<ApiDefsWithTimestamp> {
    const apiDefs = await this.apiDefModel.find().populate('sources').lean().exec();
    return {
      apiDefs,
      timestamp: this.lastUpdateTime,
    };
  }

  public async setLastUpdateTime(): Promise<number> {
    this.lastUpdateTime = Date.now();
    return this.lastUpdateTime;
  }

  public async create(data: any): Promise<IApiDef> {
    const apiDef = await this.apiDefModel.create(data);
    this.logger.log(`Created apiDef ${data.name}`, this.constructor.name, data);

    await this.setLastUpdateTime();
    this.publishApiDefsUpdated();

    await apiDef.populate('sources').execPopulate();
    return apiDef.toObject();
  }

  public async delete(name: string): Promise<number> {
    const { deletedCount } = await this.apiDefModel.deleteOne({ name });
    this.logger.log(`Deleted apiDef ${name}`, this.constructor.name);

    if (deletedCount) {
      await this.setLastUpdateTime();
      this.publishApiDefsUpdated();
    }

    return deletedCount;
  }

  public publishApiDefsUpdated(): Promise<number> {
    return this.redisService.publishApiDefsUpdated(this.lastUpdateTime);
  }
}
