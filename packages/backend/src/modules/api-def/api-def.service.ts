import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectID } from 'mongodb';
import IApiDef from '../../common/interface/api-def.interface';
import { LoggerService } from '../../common/logger';
import { IApiDefDocument } from '../../data/schema/api-def.schema';
import RedisService from '../redis/redis.service';
import SourceService from '../source/source.service';
import { ValidationError } from 'apollo-server-express';
import { ISourceDocument } from 'src/data/schema/source.schema';

export type ApiDefsWithTimestamp = { apiDefs: IApiDef[]; timestamp: number };

@Injectable()
export default class ApiDefService {
  public lastUpdateTime: number;

  public constructor(
    @InjectModel('ApiDef') private apiDefModel: Model<IApiDefDocument>,
    private readonly logger: LoggerService,
    private readonly redisService: RedisService,
    @Inject(forwardRef(() => SourceService)) private readonly sourceService: SourceService
  ) {
    this.setLastUpdateTime();
  }

  public setLastUpdateTime(): number {
    this.lastUpdateTime = Date.now();
    return this.lastUpdateTime;
  }

  public publishApiDefsUpdated(): Promise<number> {
    return this.redisService.publishApiDefsUpdated(this.lastUpdateTime);
  }

  public async findAllByUser(user: string): Promise<ApiDefsWithTimestamp> {
    const apiDefs = await this.apiDefModel.find({ user }).populate('sources').exec();
    return {
      apiDefs,
      timestamp: this.lastUpdateTime,
    };
  }

  public findByName(name: string): Promise<IApiDefDocument | null> {
    return this.apiDefModel.findOne({ name }).exec();
  }

  public async create(data: IApiDef, sourcesIds: string[], user: string): Promise<IApiDefDocument> {
    data.sources = await this.validateSourceIds(sourcesIds);
    const apiDef = await this.apiDefModel.create({ ...data, user });
    this.logger.log(`Created apiDef ${data.name}`, this.constructor.name, data);

    this.setLastUpdateTime();
    this.publishApiDefsUpdated();

    await apiDef.populate('sources').execPopulate();
    return apiDef;
  }

  public async update(name: string, data: IApiDef, sourcesIds: string[], user: string): Promise<IApiDefDocument> {
    data.sources = await this.validateSourceIds(sourcesIds);
    const { nModified } = await this.apiDefModel.updateOne({ name, user }, data);
    if (!nModified) {
      throw new ValidationError(`API "${name}" does not exist`);
    }

    const updated = (await this.findByName(data.name)) as IApiDefDocument;
    this.logger.log(`Updated API ${name}`, this.constructor.name, data);
    this.setLastUpdateTime();
    this.publishApiDefsUpdated();

    return updated;
  }

  public async delete(name: string, user: string): Promise<boolean> {
    const { deletedCount } = await this.apiDefModel.deleteOne({ name, user });

    if (deletedCount) {
      this.logger.log(`Deleted apiDef ${name}`, this.constructor.name);
      this.setLastUpdateTime();
      this.publishApiDefsUpdated();
    }

    return Boolean(deletedCount);
  }

  public async isSourceUsed(id: ObjectID): Promise<IApiDefDocument | null> {
    return this.apiDefModel.findOne({ sources: id });
  }

  private async validateSourceIds(ids: string[]): Promise<ISourceDocument[]> {
    const sources = await this.sourceService.findByIds(ids);
    if (sources.length < ids.length) {
      throw new ValidationError(`${ids.length - sources.length} sources were not found`);
    }
    return sources;
  }
}
