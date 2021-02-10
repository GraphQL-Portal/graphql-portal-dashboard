import { MetricsChannels } from '@graphql-portal/types';
import { Test, TestingModule } from '@nestjs/testing';
import * as mongoose from 'mongoose';
import { config } from 'node-config-ts';
import { AnyMetric, AnyResolverMetric } from '../../modules/metric/interfaces';
import AppModule from '../../modules/app.module';
import MetricService from '../../modules/metric/metric.service';
import { randomObjectId } from '../common';

jest.useFakeTimers();

jest.mock('ioredis');

describe('MetricService', () => {
  let app: TestingModule;
  let metricService: MetricService;

  const geo = {
    country: 'country',
    city: 'city',
    location: {
      latitude: 90,
      longitude: 180,
    },
  };
  const maxmind = {
    country: jest.fn(() => ({
      country: {
        names: {
          en: geo.country,
        },
      },
    })),
    city: jest.fn(() => ({
      city: {
        names: {
          en: geo.city,
        },
      },
      location: geo.location,
    })),
  };

  beforeAll(async () => {
    app = await Test.createTestingModule({ imports: [AppModule] }).compile();

    await Promise.all(mongoose.connections.map((c) => c.db?.dropDatabase()));

    metricService = app.get<MetricService>(MetricService);
    (metricService as any).maxmind = maxmind;
  });

  afterAll(async () => {
    jest.clearAllTimers();
    jest.useRealTimers();
    await mongoose.connection.close();
    await app.close();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('init', () => {
    it('should call fetchMetrics after delay time', async () => {
      const spyFetchMetrics = jest
        .spyOn(metricService as any, 'fetchMetrics')
        .mockImplementation(() => {});

      metricService.init();
      jest.advanceTimersByTime(config.application.metrics.delay);

      expect(spyFetchMetrics).toBeCalledTimes(2);
      expect(spyFetchMetrics).nthCalledWith(
        1,
        MetricsChannels.REQUEST_IDS,
        config.application.metrics.chunk
      );
      expect(spyFetchMetrics).nthCalledWith(
        2,
        MetricsChannels.NETWORK,
        config.application.metrics.chunk
      );
    });

    describe('fetchMetrics', () => {
      const chunk = 100;
      const records = [1, 2, 3];

      it('fetchMetrics should call aggregateRequestMetric', async () => {
        const spyGetRecords = jest
          .spyOn(metricService as any, 'getRecords')
          .mockResolvedValue(records);
        const spyAggregateRequestMetric = jest
          .spyOn(metricService as any, 'aggregateRequestMetric')
          .mockImplementation();

        await (metricService as any).fetchMetrics(
          MetricsChannels.REQUEST_IDS,
          chunk
        );

        expect(spyGetRecords).toBeCalledTimes(1);
        expect(spyGetRecords).toBeCalledWith(
          MetricsChannels.REQUEST_IDS,
          chunk
        );
        expect(spyAggregateRequestMetric).toBeCalledTimes(records.length);
        expect(spyAggregateRequestMetric).nthCalledWith(1, records[0]);
        expect(spyAggregateRequestMetric).nthCalledWith(2, records[1]);
        expect(spyAggregateRequestMetric).nthCalledWith(3, records[2]);
      });

      it('fetchMetrics should call aggregateNetworkMetric', async () => {
        const spyGetRecords = jest
          .spyOn(metricService as any, 'getRecords')
          .mockResolvedValue(records);
        const spyAggregateNetworkMetric = jest
          .spyOn(metricService as any, 'aggregateNetworkMetric')
          .mockImplementation();

        await (metricService as any).fetchMetrics(
          MetricsChannels.NETWORK,
          chunk
        );

        expect(spyGetRecords).toBeCalledTimes(1);
        expect(spyGetRecords).toBeCalledWith(MetricsChannels.NETWORK, chunk);
        expect(spyAggregateNetworkMetric).toBeCalledTimes(records.length);
        expect(spyAggregateNetworkMetric).nthCalledWith(1, records[0]);
        expect(spyAggregateNetworkMetric).nthCalledWith(2, records[1]);
        expect(spyAggregateNetworkMetric).nthCalledWith(3, records[2]);
      });
    });

    it('aggregateNetworkMetric should create network-metric entity', async () => {
      const data = {
        network: {
          bytesIn: 1,
          bytesOut: 2,
          connections: 3,
        },
        date: 4,
        nodeId: 'nodeId',
      };
      const spyCreate = jest
        .spyOn((metricService as any).networkMetricModel, 'create')
        .mockImplementation();

      await (metricService as any).aggregateNetworkMetric(JSON.stringify(data));

      expect(spyCreate).toBeCalledTimes(1);
      expect(spyCreate).toBeCalledWith({
        nodeId: data.nodeId,
        date: data.date,
        ...data.network,
      });
    });

    it('aggregateRequestMetric should create request-metric entity', async () => {
      const nodeId = '1.2.3';
      const userAgent = 'userAgent';
      const ip = '1.2.3';
      const query = { query: 'query {a {a}}', variables: {} };
      const request = { smth: 'smth' };
      const rawResponseBody = 'rawResponseBody';
      const contentLength = 'contentLength';
      const requestDate = 1;
      const responseDate = 2;

      const records: AnyMetric[] = [
        {
          event: MetricsChannels.GOT_REQUEST,
          nodeId,
          query,
          userAgent,
          ip,
          request,
          date: requestDate,
        } as any,
        {
          event: MetricsChannels.SENT_RESPONSE,
          rawResponseBody,
          contentLength,
          date: responseDate,
        },
      ];
      const resolvers = [{ path: 'path', latency: 100500 }];

      const spyCreate = jest
        .spyOn((metricService as any).requestMetricModel, 'create')
        .mockImplementation();
      const spyLrange = jest
        .spyOn((metricService as any).redis, 'lrange')
        .mockResolvedValue(records.map((r) => JSON.stringify(r)));
      const spyLtrim = jest
        .spyOn((metricService as any).redis, 'ltrim')
        .mockImplementation(() => {});
      const spyReduceResolvers = jest
        .spyOn(metricService as any, 'reduceResolvers')
        .mockReturnValue(resolvers);

      const requestId = '1';
      await (metricService as any).aggregateRequestMetric(requestId);

      expect(spyLrange).toBeCalledTimes(1);
      expect(spyLrange).toBeCalledWith(requestId, 0, -1);
      expect(spyLtrim).toBeCalledTimes(1);
      expect((metricService as any).maxmind.city).toBeCalledTimes(1);
      expect((metricService as any).maxmind.city).toBeCalledWith(ip);
      expect((metricService as any).maxmind.country).toBeCalledTimes(1);
      expect((metricService as any).maxmind.country).toBeCalledWith(ip);
      expect(spyLtrim).toBeCalledWith(requestId, records.length, -1);
      expect(spyReduceResolvers).toBeCalledTimes(1);
      expect(spyCreate).toBeCalledTimes(1);
      expect(spyCreate).toBeCalledWith({
        requestId,
        resolvers,
        latency: responseDate - requestDate,
        nodeId,
        query,
        userAgent,
        ip,
        geo,
        request,
        rawResponseBody,
        contentLength,
        error: null,
        requestDate,
        responseDate,
      });
    });

    it('reduceResolvers', () => {
      const info = { info: 'smth' };
      const args = { args: 'smth' };
      const path = 'a';
      const source = 'b';
      const error = 'error';
      const resolverCalledDate = 1;
      const resolverDoneDate = 2;
      const resolverErrorDate = 3;
      const result = 'result';
      const resolvers: AnyResolverMetric[] = [
        {
          event: MetricsChannels.RESOLVER_CALLED,
          source,
          info,
          args,
          path,
          date: resolverCalledDate,
        },
        {
          event: MetricsChannels.RESOLVER_DONE,
          source,
          path,
          date: resolverDoneDate,
          result,
        },
        {
          event: MetricsChannels.RESOLVER_ERROR,
          source,
          path,
          date: resolverErrorDate,
          error,
        },
      ];
      const sourceId = 1;
      const api = {
        sources: [
          {
            name: source,
            _id: sourceId,
          },
        ],
      };

      const data = (metricService as any).reduceResolvers(api, resolvers);
      expect(data).toMatchObject([
        {
          path,
          latency: resolverDoneDate - resolverCalledDate,
          info,
          args,
          source,
          sourceId,
          result,
          doneAt: resolverDoneDate,
          calledAt: resolverCalledDate,
          errorAt: resolverErrorDate,
          error,
        },
      ]);
    });
    it('getApiActivity', async () => {
      const apiDef = randomObjectId();
      const spyAggregate = jest
        .spyOn((metricService as any).requestMetricModel, 'aggregate')
        .mockResolvedValue([
          {
            count: [{ _id: apiDef, value: 1 }],
            latency: [{ _id: apiDef, value: 2 }],
            failed: [{ _id: apiDef, value: 3 }],
            success: [{ _id: apiDef, value: 4 }],
            lastAccess: [{ _id: apiDef, value: 5 }],
            apiName: [{ _id: apiDef, value: 'apiName' }],
          },
        ]);
      const data = await metricService.getApiActivity({
        startDate: new Date(),
        endDate: new Date(),
        user: randomObjectId(),
        apiDef,
      });

      expect(spyAggregate).toBeCalledTimes(1);
      expect(data).toMatchObject([
        {
          apiName: 'apiName',
          apiDef,
          count: 1,
          latency: 2,
          failed: 3,
          success: 4,
          lastAccess: 5,
        },
      ]);
    });
  });
});
