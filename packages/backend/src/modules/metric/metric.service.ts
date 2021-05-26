import { MetricsChannels } from '@graphql-portal/types';
import {
  forwardRef,
  Inject,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Model } from 'mongoose';
import { config } from 'node-config-ts';
import {
  LocationRecord,
  PostalRecord,
  Reader,
  ReaderModel,
  WebServiceClient,
} from '@maxmind/geoip2-node';
import Provider from '../../common/enum/provider.enum';
import { LoggerService } from '../../common/logger';
import { INetworkMetricDocument } from '../../data/schema/network-metric.schema';
import { IRequestMetricDocument } from '../../data/schema/request-metric.schema';
import ApiDefService from '../api-def/api-def.service';

import {
  AnyMetric,
  AnyResolverMetric,
  IAggregateFilters,
  IApiActivity,
  IAPIMetric,
  IGotError,
  IGotRequest,
  IMatch,
  IMetricFilter,
  IReducedResolver,
  ISentResponse,
  ISlowestRequest,
} from './interfaces';
import { IApiDefDocument } from '../../data/schema/api-def.schema';
import { RedisClient } from '../../common/types';
import ICountryMetric from './interfaces/country-metric.interface';

@Injectable()
export default class MetricService implements OnModuleInit, OnModuleDestroy {
  private redis: RedisClient;
  private maxmind: ReaderModel | WebServiceClient | void;
  private intervals: NodeJS.Timer[] = [];

  public constructor(
    @Inject(Provider.REDIS)
    private readonly redisClients: [RedisClient, RedisClient],
    @Inject(forwardRef(() => ApiDefService))
    private readonly apiDefService: ApiDefService,
    @InjectModel('RequestMetric')
    private requestMetricModel: Model<IRequestMetricDocument>,
    @InjectModel('NetworkMetric')
    private networkMetricModel: Model<INetworkMetricDocument>,
    private readonly logger: LoggerService
  ) {
    [this.redis] = this.redisClients;
  }

  public async onModuleInit(): Promise<void> {
    await this.setMaxmindClient();
    this.init();
  }

  public async onModuleDestroy(): Promise<void> {
    this.intervals.forEach((interval) => clearInterval(interval));
  }

  public init(): void {
    const {
      enabled = true,
      chunk = 100,
      delay = 5000,
    } = config.application.metrics;

    if (!enabled) return;

    if (this.intervals.length) {
      this.intervals.forEach(clearInterval);
      this.intervals = [];
    }

    this.intervals.push(
      setInterval(
        this.fetchMetrics.bind(this, MetricsChannels.REQUEST_IDS, chunk),
        delay
      )
    );
    this.intervals.push(
      setInterval(
        this.fetchMetrics.bind(this, MetricsChannels.NETWORK, chunk),
        delay
      )
    );
  }

  private async fetchMetrics(
    channel: MetricsChannels.REQUEST_IDS | MetricsChannels.NETWORK,
    chunk: number
  ): Promise<void> {
    const aggregateFunction = {
      [MetricsChannels.NETWORK]: this.aggregateNetworkMetric.bind(this),
      [MetricsChannels.REQUEST_IDS]: this.aggregateRequestMetric.bind(this),
    }[channel];

    try {
      const records = await this.getRecords(channel, chunk);
      if (!records.length) return;

      await Promise.all(records.map(async (r) => aggregateFunction(r)));
    } catch (error) {
      this.logger.error(
        error,
        null,
        `${this.constructor.name}:${this.fetchMetrics.name}`,
        { channel, chunk }
      );
    }
  }

  /**
   * User's API Activity for "Api Activity" page
   */
  public async getApiActivity(
    filters: IAggregateFilters
  ): Promise<IApiActivity[]> {
    const aggregationQuery = [
      { $match: this.makeMatchFromFilters(filters) },
      {
        $lookup: {
          from: 'apidefs',
          localField: 'apiDef',
          foreignField: '_id',
          as: 'apiDefs',
        },
      },
      { $unwind: '$apiDef' },
      {
        $facet: {
          latency: [
            { $group: { _id: '$apiDef', value: { $avg: '$latency' } } },
          ],
          count: [{ $group: { _id: '$apiDef', value: { $sum: 1 } } }],
          failed: [
            {
              $match: {
                $or: [
                  { 'resolvers.errorAt': { $exists: true } },
                  { error: { $not: { $eq: null } } },
                ],
              },
            },
            { $group: { _id: '$apiDef', value: { $sum: 1 } } },
          ],
          success: [
            {
              $match: {
                $and: [
                  { 'resolvers.errorAt': { $exists: false } },
                  { error: { $eq: null } },
                ],
              },
            },
            { $group: { _id: '$apiDef', value: { $sum: 1 } } },
          ],
          lastAccess: [
            { $group: { _id: '$apiDef', value: { $last: '$requestDate' } } },
          ],
          apiName: [
            {
              $group: {
                _id: '$apiDef',
                value: { $first: { $arrayElemAt: ['$apiDefs.name', 0] } },
              },
            },
          ],
        },
      },
    ];

    const [aggregationResult] = await this.requestMetricModel.aggregate(
      aggregationQuery
    );
    const result = Object.entries(aggregationResult).reduce(
      (acc, [key, apiDefs]: [string, { _id: string; value: number }[]]) => {
        apiDefs.forEach(({ _id, value }: any) => {
          const api = acc[_id] || (acc[_id] = {});
          api[key] = value;
        });
        return acc;
      },
      {} as any
    );

    return Object.entries(result).map(
      ([apiDef, values]: [string, Record<string, unknown>]) => ({
        failed: 0,
        success: 0,
        latency: 0,
        count: 0,
        lastAccess: '',
        apiName: '',
        apiDef,
        ...values,
      })
    );
  }

  /**
   * Gets 10 slowest requests grouped by field name
   *
   * @param filters Metric filters
   */
  public async getSlowestRequests(
    filters: IAggregateFilters
  ): Promise<IRequestMetricDocument[]> {
    return this.requestMetricModel.aggregate([
      {
        $match: this.makeMatchFromFilters(filters),
      },
      {
        $sort: {
          latency: -1,
        },
      },
      {
        $lookup: {
          from: 'apidefs',
          localField: 'apiDef',
          foreignField: '_id',
          as: 'apiDefs',
        },
      },
      {
        $addFields: {
          apiName: { $arrayElemAt: ['$apiDefs.name', 0] },
        },
      },
      {
        $limit: 10,
      },
    ]);
  }

  /**
   * Gets RequestMetrics split into date chunks.
   *
   * @param chunks Array of dates that represents date boundaries
   * @param filters Metric filters
   */
  public async getChunkedAPIMetrics(
    chunks: Date[],
    filters: IMetricFilter
  ): Promise<IAPIMetric[]> {
    const boundaries = chunks.map((v) => new Date(v));
    const def = chunks[chunks.length - 1];

    const aggregationPipeline: unknown[] = [
      {
        $match: {
          $and: [
            this.makeMatchFromFilters({
              ...filters,
              startDate: chunks[0],
              endDate: chunks[chunks.length - 1],
            }),
          ],
        },
      },
      {
        $facet: {
          // Average Latency
          latency: [
            {
              $match: { latency: { $ne: null } },
            },
            {
              $bucket: {
                groupBy: '$requestDate',
                default: def,
                boundaries,
                output: { latency: { $avg: '$latency' }, count: { $sum: 1 } },
              },
            },
          ],
          // Count of successful requests
          successes: [
            {
              $match: {
                $and: [
                  { 'resolvers.errorAt': { $exists: false } },
                  { error: { $eq: null } },
                  { latency: { $ne: null } },
                ],
              },
            },
            {
              $bucket: {
                groupBy: '$requestDate',
                default: def,
                boundaries,
                output: { count: { $sum: 1 } },
              },
            },
          ],
          // Count of failed requests
          failures: [
            {
              $match: {
                $or: [
                  { 'resolvers.errorAt': { $exists: true } },
                  { error: { $not: { $eq: null } } },
                ],
              },
            },
            {
              $bucket: {
                groupBy: '$requestDate',
                default: def,
                boundaries,
                output: { count: { $sum: 1 } },
              },
            },
          ],
        },
      },
    ];

    const [aggregationResult] = await this.requestMetricModel.aggregate(
      aggregationPipeline
    );

    const aggregateToHashMap = (
      accumulator: Record<string, any>,
      curr: any
    ): Record<string, any> => {
      accumulator[curr._id.toISOString()] = curr;
      return accumulator;
    };

    // Convert results into HashMaps and then map the results
    // to the incoming chunks
    const latencyMap = aggregationResult.latency.reduce(aggregateToHashMap, {});
    const sucessesMap = aggregationResult.successes.reduce(
      aggregateToHashMap,
      {}
    );
    const failuresMap = aggregationResult.failures.reduce(
      aggregateToHashMap,
      {}
    );

    // Map to chunks
    return chunks.map((c) => {
      const date = new Date(c);
      const metric: IAPIMetric = {
        chunk: date,
        avgLatency: 0,
        count: 0,
        failures: 0,
        successes: 0,
      };

      const key = date.toISOString();
      if (latencyMap[key]) {
        metric.avgLatency = latencyMap[key].latency;
        metric.count = latencyMap[key].count;
      }

      if (sucessesMap[key]) metric.successes = sucessesMap[key].count;
      if (failuresMap[key]) metric.failures = failuresMap[key].count;

      return metric;
    });
  }

  /**
   * Get aggregated stats per country.
   * Results are sorted by DESC and are not limited by default.
   */
  public async getCountryMetrics(
    filters: IAggregateFilters,
    limit?: number
  ): Promise<ICountryMetric[]> {
    const query: unknown[] = [
      {
        $match: {
          $and: [
            this.makeMatchFromFilters(filters),
            { 'geo.country': { $ne: null } },
          ],
        },
      },
      {
        $group: {
          _id: '$geo.country',
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
    ];
    if (limit) {
      query.push({ $limit: limit });
    }

    const results = await this.requestMetricModel.aggregate(query);

    return results.map(({ _id, count }: any) => ({
      country: _id,
      count,
    }));
  }

  public async removeForApiDef(apiDefId: string): Promise<boolean> {
    this.logger.debug(
      `Removing metrics for apiDef: ${apiDefId}`,
      this.constructor.name
    );
    const deleted = await this.requestMetricModel.deleteMany({
      apiDef: apiDefId,
    });

    return Boolean(deleted?.ok);
  }

  private async getRecords(
    channel: MetricsChannels.REQUEST_IDS | MetricsChannels.NETWORK,
    chunk: number
  ): Promise<string[]> {
    const [[error, records]] = await this.redis
      .multi()
      .lrange(channel, 0, chunk)
      .ltrim(channel, chunk + 1, -1)
      .exec();

    if (error) throw error;

    return records;
  }

  private async aggregateRequestMetric(requestId: string): Promise<void> {
    const rawData: AnyMetric[] = (
      await this.redis.lrange(requestId, 0, -1)
    ).map((s) => JSON.parse(s));
    await this.redis.ltrim(requestId, rawData.length, -1);

    const gotRequest: IGotRequest | undefined = rawData.find(
      ({ event }) => event === MetricsChannels.GOT_REQUEST
    ) as any;
    if (/IntrospectionQuery/.test(gotRequest?.query?.query as string)) return;

    const gotError: IGotError | undefined = rawData.find(
      ({ event }) => event === MetricsChannels.GOT_ERROR
    ) as any;
    const sentResponse: ISentResponse | undefined = rawData.find(
      ({ event }) => event === MetricsChannels.SENT_RESPONSE
    ) as any;

    // todo get endpoint from gotRequest.context
    const api = await this.apiDefService.findByEndpoint(
      gotRequest?.request.baseUrl
    );

    if (!api)
      this.logger.warn(
        'Api with such endpoint was not found',
        `${this.constructor.name}:${this.aggregateRequestMetric.name}`,
        { requestId, endpoint: gotRequest?.request.baseUrl }
      );

    const resolvers = this.reduceResolvers(
      api,
      rawData.filter(this.isResolverMetric) as AnyResolverMetric[]
    );

    const latency =
      sentResponse && gotRequest
        ? sentResponse.date - gotRequest.date
        : undefined;

    await this.requestMetricModel.create({
      apiDef: api?._id,
      user: api?.user._id,
      requestId,
      resolvers,
      latency,
      nodeId: gotRequest?.nodeId,
      query:
        gotRequest?.query instanceof Object
          ? gotRequest.query
          : { query: '', variables: null },
      userAgent: gotRequest?.userAgent,
      ip: gotRequest?.ip,
      geo: await this.getGeoData(gotRequest?.ip),
      request: gotRequest?.request,
      rawResponseBody: sentResponse?.rawResponseBody,
      contentLength: sentResponse?.contentLength,
      error: gotError?.error || null,
      requestDate: gotRequest?.date,
      responseDate: sentResponse?.date,
    });
  }

  private async aggregateNetworkMetric(record: string): Promise<void> {
    const { date, network, nodeId } = JSON.parse(record);

    await this.networkMetricModel.create({ date, ...network, nodeId });
  }

  private reduceResolvers(
    apiDef: IApiDefDocument | null,
    rawData: AnyResolverMetric[]
  ): IReducedResolver[] {
    const resolvers = rawData.reduce(
      (acc: any, resolverData: AnyResolverMetric) => {
        const { path } = resolverData;

        if (!acc[path]) {
          acc[path] = {};
        }

        acc[path] = {
          ...acc[path],
          ...this.transformResolverData(resolverData),
        };

        const resolver = acc[path];

        const doneAt = resolver.doneAt || resolver.errorAt;
        const calledAt = resolver.calledAt;
        if (calledAt && doneAt && !resolver.latency) {
          resolver.latency = doneAt - calledAt;
        }

        if (apiDef && !resolver.sourceId && resolver.source) {
          resolver.sourceId = apiDef.sources.find(
            ({ name }) => name === resolver.source
          )?._id;
        }

        return acc;
      },
      {}
    );

    return Object.values(resolvers);
  }

  private transformResolverData(
    data: AnyResolverMetric
  ): Partial<IReducedResolver> {
    switch (data.event) {
      case MetricsChannels.RESOLVER_CALLED:
        return {
          path: data.path,
          source: data.source,
          info: data.info,
          args: data.args,
          calledAt: data.date,
        };
      case MetricsChannels.RESOLVER_DONE:
        return {
          doneAt: data.date,
          result: data.result,
        };
      case MetricsChannels.RESOLVER_ERROR:
        return {
          errorAt: data.date,
          error: data.error,
        };
      default:
        return {};
    }
  }

  private isResolverMetric(metric: AnyMetric): boolean {
    return [
      MetricsChannels.RESOLVER_CALLED,
      MetricsChannels.RESOLVER_DONE,
      MetricsChannels.RESOLVER_ERROR,
    ].includes(metric.event);
  }

  private async setMaxmindClient(): Promise<void> {
    const context = `${this.constructor.name}:${this.setMaxmindClient.name}`;
    const { dbPath, accountId, licenseKey } = config.application.maxmind;
    if (dbPath) {
      this.logger.debug('Maxmind uses local db', context, { dbPath });
      this.maxmind = await Reader.open(dbPath).catch((error) => {
        this.logger.error(error, null, context, { dbPath });
      });
    } else if (accountId && licenseKey) {
      this.logger.debug('Maxmind uses web service client', context, {
        accountId,
        licenseKey,
      });
      this.maxmind = new WebServiceClient(accountId, licenseKey);
    } else {
      this.logger.debug(
        'Maxmind is not used, request-metrics will not have geo data',
        context
      );
    }
  }

  private async getGeoData(ip?: string): Promise<{
    city?: string;
    location?: LocationRecord;
    postal?: PostalRecord;
    country?: string;
  }> {
    if (!ip || !this.maxmind) return {};
    const context = `${this.constructor.name}:${this.getGeoData.name}`;

    try {
      this.logger.debug(`Looking for geo data for ip: ${ip}`, context);
      const { city, location, country, postal } = await this.maxmind.city(ip);
      return {
        city: city?.names.en,
        country: country?.names.en,
        location,
        postal,
      };
    } catch (error) {
      this.logger.error(error, null, context);
      return {};
    }
  }

  private makeMatchFromFilters(
    filters: IAggregateFilters | IMetricFilter
  ): IMatch {
    const match: IMatch = {};
    const filterToFunction = {
      startDate: (value: Date | number): void => {
        if (!match.requestDate) match.requestDate = {};
        match.requestDate.$gte = new Date(value);
      },
      endDate: (value: Date | number): void => {
        if (!match.requestDate) match.requestDate = {};
        match.requestDate.$lte = new Date(value);
      },
      sourceId: (value: string): void => {
        match['resolvers.sourceId'] = new ObjectId(value);
      },
      apiDef: (value: string): void => {
        match.apiDef = new ObjectId(value);
      },
      user: (value: string): void => {
        match.user = new ObjectId(value);
      },
    };
    Object.entries(filters).forEach(
      ([key, value]: [keyof IAggregateFilters, any]) => {
        if (filterToFunction[key] && value) {
          filterToFunction[key](value);
        }
      }
    );
    return match;
  }
}
