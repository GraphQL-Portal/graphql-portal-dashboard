import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ValidationError } from 'apollo-server-express';
import { Model } from 'mongoose';
import IAccessControlService from '../../common/interface/access-control.interface';
import IApiDef from '../../common/interface/api-def.interface';
import { LoggerService } from '../../common/logger';
import { IApiDefDocument } from '../../data/schema/api-def.schema';
import { ISourceDocument } from '../../data/schema/source.schema';
import RedisService from '../redis/redis.service';
import SourceService from '../source/source.service';

export type ApiDefsWithTimestamp = { apiDefs: IApiDef[]; timestamp: number };

@Injectable()
export default class ApiDefService implements IAccessControlService {
  public lastUpdateTime: number;

  public constructor(
    @InjectModel('ApiDef') private apiDefModel: Model<any>,
    private readonly logger: LoggerService,
    private readonly redisService: RedisService,
    @Inject(forwardRef(() => SourceService))
    private readonly sourceService: SourceService
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

  public async findAll(): Promise<ApiDefsWithTimestamp> {
    const apiDefs = await this.apiDefModel.find().populate('sources').exec();
    return {
      apiDefs,
      timestamp: this.lastUpdateTime,
    };
  }

  public async findAllByUser(user: string): Promise<ApiDefsWithTimestamp> {
    const apiDefs = await this.apiDefModel
      .find({ user })
      .populate('sources')
      .exec();
    return {
      apiDefs,
      timestamp: this.lastUpdateTime,
    };
  }

  public async create(
    data: IApiDef,
    sourcesIds: string[],
    user: string
  ): Promise<IApiDefDocument> {
    data.sources = await this.validateSourceIds(sourcesIds);
    const apiDef = await this.apiDefModel.create({ ...data, user });
    this.logger.log(`Created apiDef ${data.name}`, this.constructor.name, data);

    this.setLastUpdateTime();
    this.publishApiDefsUpdated();

    await apiDef.populate('sources').execPopulate();
    return apiDef;
  }

  public async update(
    id: string,
    apiDef: IApiDef,
    sourcesIds: string[]
  ): Promise<IApiDefDocument> {
    apiDef.sources = await this.validateSourceIds(sourcesIds);

    const toUpdate = await this.apiDefModel.findById(id);

    if (!toUpdate)
      throw new ValidationError(`ApiDef with id ${id} does not exist`);

    const updated = (await this.apiDefModel.findByIdAndUpdate(
      toUpdate._id,
      apiDef,
      { new: true }
    ))!;

    this.logger.log(
      `Updated API ${updated._id}`,
      this.constructor.name,
      apiDef
    );

    this.setLastUpdateTime();
    this.publishApiDefsUpdated();

    return updated;
  }

  public async delete(id: string): Promise<boolean> {
    const deleted = await this.apiDefModel.findByIdAndDelete(id);

    if (deleted) {
      this.logger.log(`Deleted apiDef ${deleted._id}`, this.constructor.name);
      this.setLastUpdateTime();
      this.publishApiDefsUpdated();
    }

    return Boolean(deleted);
  }

  public async isSourceUsed(sources: string): Promise<IApiDefDocument | null> {
    return this.apiDefModel.findOne({ sources });
  }

  private async validateSourceIds(ids: string[]): Promise<ISourceDocument[]> {
    const sources = await this.sourceService.findByIds(ids);
    if (sources.length < ids.length) {
      throw new ValidationError(
        `${ids.length - sources.length} sources were not found`
      );
    }
    return sources;
  }

  public async isOwner(user: string, _id: string): Promise<boolean> {
    return Boolean(await this.apiDefModel.findOne({ _id, user }));
  }
}
