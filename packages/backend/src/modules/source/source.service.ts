import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { LoggerService } from '../../common/logger';
import { Model } from 'mongoose';
import { ISourceDocument } from '../../data/schema/source.schema';
import { SourceConfig } from '@graphql-portal/types';

@Injectable()
export default class SourceService {
  public constructor(
    @InjectModel('Source') private sourceModel: Model<ISourceDocument>,
    private readonly logger: LoggerService
  ) {}

  public findAll(): Promise<SourceConfig[]> {
    return this.sourceModel.find().lean().exec();
  }

  public findByIds(ids: string[]): Promise<SourceConfig[]> {
    return this.sourceModel.find().where('_id').in(ids).lean().exec();
  }

  public async create(data: SourceConfig): Promise<SourceConfig> {
    const source = await this.sourceModel.create(data);

    this.logger.log(`Created source ${data.name}`, this.constructor.name, data);

    return source.toObject();
  }

  public async delete(name: string): Promise<number> {
    const { deletedCount } = await this.sourceModel.deleteOne({ name });
    this.logger.log(`Deleted source ${name}`, this.constructor.name);
    return deletedCount;
  }
}
