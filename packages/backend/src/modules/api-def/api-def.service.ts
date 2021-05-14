import { getMeshForApiDef } from '@graphql-portal/gateway/dist/src/server/router';
import { SourceConfig, Channel, ApiDefStatus } from '@graphql-portal/types';
import { AdditionalStitchingResolverObject } from '@graphql-portal/types/src/api-def-config';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ValidationError } from 'apollo-server-express';
import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { printSchema } from 'graphql/utilities';
import { Model } from 'mongoose';
import IAccessControlService from '../../common/interface/access-control.interface';
import IApiDef from '../../common/interface/api-def.interface';
import { LoggerService } from '../../common/logger';
import { IApiDefDocument } from '../../data/schema/api-def.schema';
import { ISourceDocument } from '../../data/schema/source.schema';
import RedisService from '../redis/redis.service';
import SourceService from '../source/source.service';
import MetricService from '../metric/metric.service';

export type ApiDefsWithTimestamp = { apiDefs: IApiDef[]; timestamp: number };

@Injectable()
export default class ApiDefService implements IAccessControlService {
  public lastUpdateTime: number;

  public constructor(
    @InjectModel('ApiDef') private apiDefModel: Model<any>,
    private readonly logger: LoggerService,
    private readonly redisService: RedisService,
    @Inject(forwardRef(() => SourceService))
    private readonly sourceService: SourceService,
    @Inject(forwardRef(() => MetricService))
    private readonly metricService: MetricService,
    private readonly redis: RedisService
  ) {
    this.setLastUpdateTime();
  }

  public onApplicationBootstrap(): void {
    this.redis.on(
      Channel.apiDefStatusUpdated,
      this.onApiDefStatusUpdated.bind(this)
    );
  }

  public async onApiDefStatusUpdated(message: string): Promise<void> {
    const context = `${this.onApiDefStatusUpdated.name}`;
    try {
      const { name, status } = JSON.parse(message);
      if (!name || !status) {
        this.logger.error(
          `Name or status is not defined in ${Channel.apiDefsUpdated} message`,
          null,
          context
        );
        return;
      }
      await this.apiDefModel.findOneAndUpdate(
        { name },
        {
          $set: {
            status,
          },
        }
      );

      this.logger.debug(`apiDef ${name} status updated to ${status}`, context);
    } catch (error) {
      this.logger.error(error, error.stack, context);
    }
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

  public async findAllForGateway(): Promise<ApiDefsWithTimestamp> {
    let apiDefs = await this.apiDefModel.find().populate('sources').exec();
    apiDefs = apiDefs.filter((apiDef) => apiDef.enabled);

    return {
      apiDefs,
      timestamp: this.lastUpdateTime,
    };
  }

  public async findByEndpoint(
    endpoint: string | undefined
  ): Promise<IApiDefDocument | null> {
    return this.apiDefModel
      .findOne({ endpoint })
      .populate('sources')
      .populate('user')
      .exec();
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

  public async findById(_id: string): Promise<IApiDef> {
    return this.apiDefModel.findOne({ _id }).populate('sources').exec();
  }

  public async create(
    data: IApiDef,
    sourcesIds: string[],
    user: string
  ): Promise<{ apiDef: IApiDefDocument; schema: string }> {
    data.sources = await this.validateSourceIds(sourcesIds);
    const schema = await this.getMeshSchema(data);
    const apiDef = await this.apiDefModel.create({ ...data, user });
    this.logger.log(`Created apiDef ${data.name}`, this.constructor.name, data);

    this.setLastUpdateTime();
    this.publishApiDefsUpdated();

    await apiDef.populate('sources').execPopulate();
    return { apiDef, schema };
  }

  public async update(
    id: string,
    data: IApiDef,
    sourcesIds: string[]
  ): Promise<{ apiDef: IApiDefDocument; schema: string }> {
    data.sources = await this.validateSourceIds(sourcesIds);

    const toUpdate = await this.apiDefModel.findById(id);

    if (!toUpdate)
      throw new ValidationError(`ApiDef with id ${id} does not exist`);

    const schema = await this.getMeshSchema(data);

    const apiDef = (await this.apiDefModel.findByIdAndUpdate(
      toUpdate._id,
      { ...data, status: ApiDefStatus.INITIALIZED },
      { new: true }
    ))!;

    this.logger.log(`Updated API ${apiDef._id}`, this.constructor.name, data);

    this.setLastUpdateTime();
    this.publishApiDefsUpdated();

    return { apiDef, schema };
  }

  public async delete(id: string): Promise<boolean> {
    const deleted = await this.apiDefModel.findByIdAndDelete(id);

    if (deleted) {
      this.logger.log(`Deleted apiDef ${deleted._id}`, this.constructor.name);
      this.setLastUpdateTime();
      this.publishApiDefsUpdated();

      const removedMetrics = await this.metricService.removeForApiDef(id);
      removedMetrics
        ? this.logger.log(
            `Removed metrics for apiDef ${id}`,
            this.constructor.name
          )
        : this.logger.warn(
            `Couldn't remove metrics for apiDef ${id}`,
            this.constructor.name
          );
    }

    return Boolean(deleted);
  }

  public async deleteByName(name: string): Promise<boolean> {
    const toDelete = await this.apiDefModel.findOne({ name });

    if (toDelete) {
      this.logger.log(`Deleting apiDef ${toDelete._id}`, this.constructor.name);
      await toDelete.delete();
      this.setLastUpdateTime();
      this.publishApiDefsUpdated();

      const removedMetrics = await this.metricService.removeForApiDef(
        toDelete._id
      );
      removedMetrics
        ? this.logger.log(
            `Removed metrics for apiDef ${toDelete._id}`,
            this.constructor.name
          )
        : this.logger.warn(
            `Couldn't remove metrics for apiDef ${toDelete._id}`,
            this.constructor.name
          );
    }

    return Boolean(toDelete);
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

  public async getMeshSchema(apiDef: IApiDef): Promise<string> {
    const context = `${this.constructor.name}.getMeshSchema`;
    let error: Error | undefined;
    const apiDefWithPlainSources = {
      ...apiDef,
      sources: apiDef.sources.map(
        (source: ISourceDocument) =>
          source.toObject?.({ getters: true }) || source
      ) as SourceConfig[],
    };
    const mesh = await getMeshForApiDef(
      apiDefWithPlainSources,
      undefined,
      0,
      (err) => {
        error = err;
      }
    );
    if (!error) {
      try {
        this.validateApiDef(apiDefWithPlainSources, mesh);
      } catch (err) {
        error = err;
      }
    }
    if (error) {
      this.logger.error(error.message, error.stack, context, error);
      const validationError = new ValidationError(error.message);
      validationError.originalError = error;
      throw validationError;
    }
    return mesh?.schema ? printSchema(mesh.schema) : '';
  }

  private validateApiDef(apiDef: IApiDef, mesh: any): void {
    apiDef.mesh?.additionalResolvers?.forEach(
      (additionalResolver: AdditionalStitchingResolverObject) => {
        const { targetSource, targetMethod, type, field } = additionalResolver;

        const source = apiDef.sources.find(
          (source) => source.name === targetSource
        );
        if (!source) {
          throw new Error(
            `Source with name '${targetSource}' was not found in the API`
          );
        }

        const meshSource = mesh?.rawSources?.find(
          (source: { name: string }) => source.name === targetSource
        );
        if (!meshSource) {
          throw new Error(`Mesh source was not built: ${targetSource}`);
        }
        const { schema } = meshSource as { schema: GraphQLSchema };
        const methods = ['Query', 'Mutation']
          .map((type) => {
            const fields = (schema.getType(
              type
            ) as GraphQLObjectType)?.getFields();
            return fields ? Object.keys(fields) : [];
          })
          .flat(3);
        if (!methods.find((method) => method === targetMethod)) {
          throw new Error(
            `Method ${targetMethod} not found in source ${targetSource}`
          );
        }

        const additionalTypeDef = (apiDef.mesh
          ?.additionalTypeDefs as string[])?.find(
          (typeDef: string) => typeDef.includes(type) && typeDef.includes(field)
        );
        if (!additionalTypeDef) {
          throw new Error(`additionalTypeDef not found for ${type}.${field}`);
        }
        const additionalType: string = additionalTypeDef
          .replace(/[{}]/g, '')
          .split(':')?.[1]
          ?.trim();
        if (!additionalType) {
          throw new Error(
            `Invalid additionalTypeDef format: ${additionalTypeDef}`
          );
        }
        if (!schema.getTypeMap()[additionalType]) {
          throw new Error(`Invalid type: ${additionalType}`);
        }
      }
    );
  }
}
