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
  ) { }

  public findAll(user: string): Promise<ISourceDocument[]> {
    return this.sourceModel.find({ user }).exec();
  }

  public findByIds(ids: string[]): Promise<ISourceDocument[]> {
    return this.sourceModel.find().where('_id').in(ids).exec();
  }

  public async create(data: SourceConfig, user: string): Promise<ISourceDocument> {
    const source = await this.sourceModel.create({ ...data, user });

    this.logger.log(`Created source ${data.name}`, this.constructor.name, data);

    return source;
  }

  public async update(id: string, data: SourceConfig): Promise<ISourceDocument> {
    const toUpdate = await this.sourceModel.findById(id);

    if (!toUpdate) throw new ValidationError(`Source with id ${id} does not exist`);

    const source = (await this.sourceModel.findByIdAndUpdate(id, data, { new: true }))!;

    if (await this.apiDefService.isSourceUsed(source._id)) {
      this.apiDefService.setLastUpdateTime();
      this.apiDefService.publishApiDefsUpdated();
    }

    return source;
  }

  public async delete(id: string): Promise<boolean> {
    const toDelete = await this.sourceModel.findById(id);

    if (toDelete) {
      const usedInApiDef = await this.apiDefService.isSourceUsed(toDelete._id);
      if (usedInApiDef) {
        throw new ValidationError(`Source "${id}" is used in API "${usedInApiDef.name}"`);
      }
      await toDelete?.delete();
    }
    this.logger.log(`Deleted source ${id}`, this.constructor.name);

    return Boolean(toDelete);
  }

  public async isOwner(user: string, _id: string): Promise<boolean> {
    return Boolean(await this.sourceModel.findOne({ _id, user }));
  }
}
