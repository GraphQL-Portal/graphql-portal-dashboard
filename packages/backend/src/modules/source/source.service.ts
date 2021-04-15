import { SourceConfig } from '@graphql-portal/types';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ValidationError } from 'apollo-server-express';
import { Model } from 'mongoose';
import IAccessControlService from '../../common/interface/access-control.interface';
import { LoggerService } from '../../common/logger';
import { ISourceDocument } from '../../data/schema/source.schema';
import ApiDefService from '../api-def/api-def.service';

@Injectable()
export default class SourceService implements IAccessControlService {
  public constructor(
    @InjectModel('Source') private sourceModel: Model<ISourceDocument>,
    private readonly logger: LoggerService,
    @Inject(forwardRef(() => ApiDefService))
    private readonly apiDefService: ApiDefService
  ) {}

  public findAllByUser(user: string): Promise<ISourceDocument[]> {
    return this.sourceModel.find({ user }).exec();
  }

  public findByIds(ids: string[]): Promise<ISourceDocument[]> {
    return this.sourceModel.find().where('_id').in(ids).exec();
  }

  public async create(
    data: SourceConfig,
    user: string
  ): Promise<ISourceDocument> {
    const sourceSchema = await this.getSchema(data);

    const source = await this.sourceModel.create({
      ...data,
      sourceSchema,
      user,
    });

    this.logger.log(`Created source ${data.name}`, this.constructor.name, data);

    return source;
  }

  public async update(
    id: string,
    data: SourceConfig
  ): Promise<ISourceDocument> {
    const toUpdate = await this.sourceModel.findById(id);

    if (!toUpdate)
      throw new ValidationError(`Source with id ${id} does not exist`);

    const sourceSchema = await this.getSchema({ ...toUpdate, ...data });

    const source = (await this.sourceModel.findByIdAndUpdate(
      id,
      { ...data, sourceSchema },
      {
        new: true,
      }
    ))!;

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
        throw new ValidationError(
          `Source "${toDelete.name}" is used in API "${usedInApiDef.name}"`
        );
      }
      await toDelete.delete();
      this.logger.log(`Deleted source ${id}`, this.constructor.name);
    }

    return Boolean(toDelete);
  }

  public async isOwner(user: string, _id: string): Promise<boolean> {
    return Boolean(await this.sourceModel.findOne({ _id, user }));
  }

  private async getSchema(source: SourceConfig): Promise<string> {
    return this.apiDefService.getMeshSchema({
      name: '',
      endpoint: '',
      sources: [source],
    });
  }

  public async updateSchema(source: SourceConfig): Promise<string> {
    const sourceSchema = await this.getSchema(source);
    await this.sourceModel.findByIdAndUpdate(source.id, { sourceSchema });
    return sourceSchema;
  }
}
