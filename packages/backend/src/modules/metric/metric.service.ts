import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { config } from 'node-config-ts';
import { Redis } from 'ioredis';
import { MetricsChannels } from '@graphql-portal/types';
import { LoggerService } from '../../common/logger';
import { IRequestMetricDocument } from '../../data/schema/request-metric.schema';
import { INetworkMetricDocument } from '../../data/schema/network-metric.schema';
import Provider from '../../common/enum/provider.enum';
import {
  AnyMetric,
  AnyResolverMetric,
  IGotError,
  IGotRequest,
  ISentResponse,
  IReducedResolver,
} from './interfaces';

@Injectable()
export default class MetricService {
  private redis: Redis;
  private intervals: NodeJS.Timer[] = [];

  public constructor(
    @Inject(Provider.REDIS) private readonly redisClients: [Redis, Redis],
    @InjectModel('RequestMetric') private requestMetricModel: Model<IRequestMetricDocument>,
    @InjectModel('NetworkMetric') private networkMetricModel: Model<INetworkMetricDocument>,
    private readonly logger: LoggerService,
  ) {
    [this.redis] = this.redisClients;
  }

  private onModuleInit(): void {
    this.init();
  }

  public init(): void {
    const { enabled = true, chunk = 10, delay = 5000 } = config.application.metrics;

    if (!enabled) return;

    if (this.intervals.length) {
      this.intervals.forEach(clearInterval);
      this.intervals = [];
    }

    this.intervals.push(setInterval(this.fetchMetrics.bind(this, MetricsChannels.REQUEST_IDS, chunk), delay));
    this.intervals.push(setInterval(this.fetchMetrics.bind(this, MetricsChannels.NETWORK, chunk), delay));
  }

  private async fetchMetrics(channel: MetricsChannels.REQUEST_IDS | MetricsChannels.NETWORK, chunk: number): Promise<void> {
    const aggregateFunction = {
      [MetricsChannels.NETWORK]: this.aggregateNetworkMetric.bind(this),
      [MetricsChannels.REQUEST_IDS]: this.aggregateRequestMetric.bind(this),
    }[channel];

    try {
      const records = await this.getRecords(channel, chunk);
      if (!records.length) return;

      await Promise.all(records.map(aggregateFunction));
    } catch (error) {
      this.logger.error(error, null, `${this.constructor.name}:${this.fetchMetrics.name}`, { channel, chunk });
    }
  }

  private async getRecords(channel: MetricsChannels.REQUEST_IDS | MetricsChannels.NETWORK, chunk: number): Promise<string[]> {
    const [[error, records]] = await this.redis
      .multi()
      .lrange(channel, 0, chunk)
      .ltrim(channel, chunk + 1, -1)
      .exec();
    return records;
  }

  private async aggregateRequestMetric(requestId: string): Promise<void> {
    const rawData: AnyMetric[] = (await this.redis.lrange(requestId, 0, -1)).map(s => JSON.parse(s));
    await this.redis.ltrim(requestId, rawData.length, -1);

    const resolvers = this.reduceResolvers(rawData.filter(this.isResolverMetric) as AnyResolverMetric[]);

    const sentResponse: ISentResponse | undefined = (rawData.find(({ event }) => event === MetricsChannels.SENT_RESPONSE) as any);
    const gotRequest: IGotRequest | undefined = (rawData.find(({ event }) => event === MetricsChannels.GOT_REQUEST) as any);
    const gotError: IGotError | undefined = (rawData.find(({ event }) => event === MetricsChannels.GOT_ERROR) as any);

    const latency = (sentResponse && gotRequest) ? sentResponse.date - gotRequest.date : undefined;

    await this.requestMetricModel.create({
      requestId,
      resolvers,
      latency,
      nodeId: gotRequest?.nodeId,
      query: (gotRequest?.query) instanceof Object ? gotRequest.query : { query: "", variables: null },
      userAgent: gotRequest?.userAgent,
      ip: gotRequest?.ip,
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


  private reduceResolvers(rawData: AnyResolverMetric[]): IReducedResolver[] {
    const resolvers = rawData.reduce((acc: any, resolverData: AnyResolverMetric) => {
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

      return acc;
    }, {});

    return Object.values(resolvers);
  };

  private transformResolverData(data: AnyResolverMetric): Partial<IReducedResolver> {
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
    return [MetricsChannels.RESOLVER_CALLED, MetricsChannels.RESOLVER_DONE, MetricsChannels.RESOLVER_ERROR].includes(metric.event);
  }
}
