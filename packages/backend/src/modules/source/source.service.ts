import { SourceConfig } from '@graphql-portal/types';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ValidationError } from 'apollo-server-express';
import { Model } from 'mongoose';
import { LoggerService } from '../../common/logger';
import { ISourceDocument } from '../../data/schema/source.schema';
import ApiDefService from '../api-def/api-def.service';

@Injectable()
export default class SourceService {
  public constructor(
    @InjectModel('Source') private sourceModel: Model<ISourceDocument>,
    private readonly logger: LoggerService,
    @Inject(forwardRef(() => ApiDefService)) private readonly apiDefService: ApiDefService
  ) {}

  public findAll(): Promise<ISourceDocument[]> {
    return this.sourceModel.find().exec();
  }

  public findByIds(ids: string[]): Promise<ISourceDocument[]> {
    return this.sourceModel.find().where('_id').in(ids).exec();
  }

  public findByName(name: string): Promise<ISourceDocument | null> {
    return this.sourceModel.findOne({ name }).exec();
  }

  public async create(data: SourceConfig): Promise<ISourceDocument> {
    const source = await this.sourceModel.create(data);

    this.logger.log(`Created source ${data.name}`, this.constructor.name, data);

    return source;
  }

  public async update(name: string, data: SourceConfig): Promise<ISourceDocument> {
    const { nModified } = await this.sourceModel.updateOne({ name }, data);
    if (!nModified) {
      throw new ValidationError(`Source "${name}" does not exist`);
    }

    const updated = (await this.findByName(data.name)) as ISourceDocument;
    this.logger.log(`Updated source ${name}`, this.constructor.name, data);

    if (await this.apiDefService.isSourceUsed(updated._id)) {
      this.apiDefService.setLastUpdateTime();
      this.apiDefService.publishApiDefsUpdated();
    }

    return updated;
  }

  public async delete(name: string): Promise<boolean> {
    const toDelete = await this.findByName(name);
    if (toDelete) {
      const usedInApiDef = await this.apiDefService.isSourceUsed(toDelete._id);
      if (usedInApiDef) {
        throw new ValidationError(`Source "${name}" is used in API "${usedInApiDef.name}"`);
      }
    }

    await this.sourceModel.deleteOne({ name });
    this.logger.log(`Deleted source ${name}`, this.constructor.name);
    return true;
  }
}
