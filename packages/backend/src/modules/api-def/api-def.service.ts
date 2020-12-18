import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import IApiDef from '../../common/interface/api-def.interface';
import { LoggerService } from '../../common/logger';
import { IApiDefDocument } from '../../data/schema/api-def.schema';
import RedisService from '../redis/redis.service';
import SourceService from '../source/source.service';

export type ApiDefsWithTimestamp = { apiDefs: IApiDef[]; timestamp: number };

@Injectable()
export default class ApiDefService {
  public lastUpdateTime: number;

  public constructor(
    @InjectModel('ApiDef') private apiDefModel: Model<IApiDefDocument>,
    private readonly logger: LoggerService,
    private readonly redisService: RedisService,
    private readonly sourceService: SourceService
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

  public setLastUpdateTime(): number {
    this.lastUpdateTime = Date.now();
    return this.lastUpdateTime;
  }

  public async create(data: IApiDef, sourcesIds: string[]): Promise<IApiDef> {
    data.sources = await this.sourceService.findByIds(sourcesIds);
    if (data.sources.length < sourcesIds.length) {
      throw new Error(`${sourcesIds.length - data.sources.length} sources were not found`);
    }
    const apiDef = await this.apiDefModel.create(data);
    this.logger.log(`Created apiDef ${data.name}`, this.constructor.name, data);

    this.setLastUpdateTime();
    this.publishApiDefsUpdated();

    await apiDef.populate('sources').execPopulate();
    return apiDef.toObject();
  }

  public async delete(name: string): Promise<number> {
    const { deletedCount } = await this.apiDefModel.deleteOne({ name });
    this.logger.log(`Deleted apiDef ${name}`, this.constructor.name);

    if (deletedCount) {
      this.setLastUpdateTime();
      this.publishApiDefsUpdated();
    }

    return deletedCount;
  }

  public publishApiDefsUpdated(): Promise<number> {
    return this.redisService.publishApiDefsUpdated(this.lastUpdateTime);
  }
}
