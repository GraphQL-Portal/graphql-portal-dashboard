import { MetricsChannels } from '@graphql-portal/types';
import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Redis } from 'ioredis';
import moment from 'moment';
import { Model } from 'mongoose';
import { config } from 'node-config-ts';
import { Reader, ReaderModel, WebServiceClient, LocationRecord } from '@maxmind/geoip2-node';
import { LoggerService } from '../../common/logger';
import { INetworkMetricDocument } from '../../data/schema/network-metric.schema';
import { IRequestMetricDocument } from '../../data/schema/request-metric.schema';
import Provider from 'src/common/enum/provider.enum';
import {
  AnyMetric,
  AnyResolverMetric,
  IGotError,
  IGotRequest,
  ISentResponse,
  IReducedResolver,
} from './interfaces';

type MetricScale = 'hour' | 'day' | 'week' | 'month';

@Injectable()
export default class MetricService {
  private redis: Redis;
  private maxmind: ReaderModel | WebServiceClient | void;
  private intervals: NodeJS.Timer[] = [];

  public constructor(
    @Inject(Provider.REDIS) private readonly redisClients: [Redis, Redis],
    @InjectModel('RequestMetric') private requestMetricModel: Model<IRequestMetricDocument>,
    @InjectModel('NetworkMetric') private networkMetricModel: Model<INetworkMetricDocument>,
    private readonly logger: LoggerService,
  ) {
    [this.redis] = this.redisClients;
  }

  private async onModuleInit(): Promise<void> {
    await this.setMaxmindClient();
    this.init();
  }

  public init(): void {
    const { enabled = true, chunk = 100, delay = 5000 } = config.application.metrics;

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

      await Promise.all(records.map(async (r) => aggregateFunction(r)));
    } catch (error) {
      this.logger.error(error, null, `${this.constructor.name}:${this.fetchMetrics.name}`, { channel, chunk });
    }
  }

  public async aggregateByLatency(startDate: number, endDate: number, scale: MetricScale): Promise<any> {
    const boundaries = this.getBoundaries(moment(startDate), moment(endDate), scale);
    const aggregationQuery = [
      { $match: { requestDate: { $gte: new Date(startDate), $lte: new Date(endDate) } } },
      { $facet: {
        latency: [
          { $bucket: {
            groupBy: '$requestDate',
            boundaries,
            output: { latency: { $avg: '$latency' }, count: { $sum: 1 },  },
          } },
        ],
        countries: [
          { $group: {
            _id: '$geo.country',
            count: { $sum: 1 },
          } },
        ],
        // failures: [
        //   { $bucket: {
        //     groupBy: '$resolvers.errorAt',
        //     boundaries,
        //     output: { latency: { $avg: '$latency' }, count: { $sum: 1 },  },
        //   } },
        // ]
      } },
    ];
    const [result] = await this.requestMetricModel.aggregate(aggregationQuery);
    const map = result.latency.reduce((p: any, c: any) => { p[c._id.toISOString()] = c; return p; }, {});
    const latencyData = boundaries.map((b) => {
      const key = b.toISOString();
      if (map[key]) return map[key];
      else return { _id: key, latency:0, count: 0};
    });

    return {
      latency: latencyData.map((obj: any) => ({ argument: obj._id, value: obj.latency})),
      count: latencyData.map((obj: any) => ({ argument: obj._id, value: obj.count})),
      countries: result.countries.map((obj: any) => ({ argument: obj._id, value: obj.count }))
    };
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

  private async setMaxmindClient(): Promise<void> {
    const context = `${this.constructor.name}:${this.setMaxmindClient.name}`;
    const { dbPath, accountId, licenseKey } = config.application.maxmind;
    if (dbPath) {
      this.logger.debug('Maxmind uses local db', context, { dbPath });
      this.maxmind = await Reader.open(dbPath).catch(error => {
        this.logger.error(error, null, context, { dbPath });
      });
    } else if (accountId && licenseKey) {
      this.logger.debug('Maxmind uses web service client', context, { accountId, licenseKey });
      this.maxmind = new WebServiceClient(accountId, licenseKey);
    } else {
      this.logger.debug('Maxmind is not used, request-metrics will not have geo data', context);
    }
  }

  private async getGeoData(ip: string | undefined): Promise<
    {
      city: string | undefined;
      location: LocationRecord | undefined;
      country: string | undefined;
    } | Record<string, never>> {
    if (!ip || !this.maxmind) return {};
    const context = `${this.constructor.name}:${this.getGeoData.name}`;

    try {
      const { city, location } = await this.maxmind.city(ip);
      const { country } = await this.maxmind.country(ip);
      this.logger.debug(`Looking for geo data for ip: ${ip}`, context);
      return {
        city: city?.names.en,
        country: country?.names.en,
        location,
      };
    } catch (error) {
      this.logger.error(error, null, context);
      return {};
    }
  }

  private getBoundaries(startDate: moment.Moment, endDate: moment.Moment, scale: 'day' | 'hour' | 'week' | 'month'): Date[] {
    const boundaries: Date[] = [];
    const next = (): boolean => {
      startDate.add(1, scale);
      return startDate.diff(endDate) <= 0;
    };

    do {
      boundaries.push(startDate.toDate());
    } while (next());

    return boundaries;
  }

}
