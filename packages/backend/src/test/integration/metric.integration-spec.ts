import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as mongoose from 'mongoose';
import Roles from '../../common/enum/roles.enum';
import supertest from 'supertest';
import HeadersEnum from '../../common/enum/headers.enum';
import IUser from '../../common/interface/user.interface';
import AppModule from '../../modules/app.module';
import MetricService from '../../modules/metric/metric.service';
import ITokens from '../../modules/user/interfaces/tokens.interface';
import UserService from '../../modules/user/user.service';
import { createUser, Method, requestTo, RequestToResult } from '../common';

jest.mock('ioredis');

jest.useFakeTimers();

describe('MetricResolver', () => {
  let request: RequestToResult;
  let app: INestApplication;
  let metricService: MetricService;
  let userService: UserService;
  let user: IUser & ITokens;
  let admin: IUser & ITokens;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(MetricService)
      .useValue({
        getApiActivity: jest.fn().mockImplementation(() => {}),
        aggregateMetrics: jest.fn().mockImplementation(() => {}),
      })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    request = requestTo(app);
    await Promise.all(mongoose.connections.map((c) => c.db?.dropDatabase()));
    metricService = app.get<MetricService>(MetricService);
    userService = app.get<UserService>(UserService);

    user = await createUser(userService);
    admin = await createUser(userService, Roles.ADMIN);
  });

  afterAll(async () => {
    await app.close();
  });

  afterEach(() => jest.clearAllMocks());

  describe('GraphQL', () => {
    let graphQlRequest: (
      query: string,
      variables?: any,
      headers?: any
    ) => supertest.Test;

    beforeAll(() => {
      graphQlRequest = (
        query: string,
        variables = {},
        headers = { [HeadersEnum.AUTHORIZATION]: user.accessToken }
      ): supertest.Test =>
        request(Method.post, '/graphql')
          .set(headers)
          .send({ query, variables });
    });

    describe('getApiActivity', () => {
      it('should call getApiActivity', async () => {
        const date = new Date().toString();
        await graphQlRequest(
          `query getApiActivity($filters: MetricFilters!) {
            getApiActivity(filters: $filters) {
              apiName
              apiDef
              count
              success
              failed
              latency
              lastAccess
            }
          }`,
          {
            filters: {
              startDate: date,
              endDate: date,
            },
          }
        ).expect(HttpStatus.OK);

        expect(metricService.getApiActivity).toHaveBeenCalledTimes(1);
        expect(metricService.getApiActivity).toHaveBeenCalledWith({
          startDate: date,
          endDate: date,
          user: user._id,
        });
      });
    });

    describe('getUserMetrics', () => {
      const date = new Date().toString();
      const apiDef = 'apiDef';
      const sourceId = 'sourceId';
      const scale = 'day';

      it('should call aggregateMetrics', async () => {
        await graphQlRequest(
          `query getUserMetrics($scale: String!, $filters: MetricFilters!) {
            getUserMetrics(scale: $scale, filters: $filters) {
              count { argument }
            }
          }`,
          {
            scale,
            filters: {
              startDate: date,
              endDate: date,
              apiDef,
              sourceId,
            },
          }
        ).expect(HttpStatus.OK);

        expect(metricService.aggregateMetrics).toHaveBeenCalledTimes(1);
        expect(metricService.aggregateMetrics).toHaveBeenCalledWith(scale, {
          startDate: date,
          endDate: date,
          user: user._id,
          apiDef,
          sourceId,
        });
      });

      describe('metrics', () => {
        it('should throw unauthorized error', async () => {
          const date = new Date().toString();
          const apiDef = 'apiDef';
          const sourceId = 'sourceId';
          const scale = 'day';

          const { body } = await graphQlRequest(
            `query metrics($scale: String!, $filters: MetricFilters!) {
              metrics(scale: $scale, filters: $filters) {
                count { argument }
              }
            }`,
            {
              scale,
              filters: {
                startDate: date,
                endDate: date,
                apiDef,
                sourceId,
              },
            }
          ).expect(HttpStatus.OK);

          expect(body.errors[0].message).toBe(
            `User role is: ${Roles.USER}, but required one of: ${Roles.ADMIN}`
          );

          expect(metricService.aggregateMetrics).toHaveBeenCalledTimes(0);
        });

        it('should call aggregateMetrics', async () => {
          await graphQlRequest(
            `query metrics($scale: String!, $filters: MetricFilters!) {
              metrics(scale: $scale, filters: $filters) {
                count { argument }
              }
            }`,
            {
              scale,
              filters: {
                startDate: date,
                endDate: date,
                apiDef,
                sourceId,
                user: user._id,
              },
            },
            {
              [HeadersEnum.AUTHORIZATION]: admin.accessToken,
            }
          ).expect(HttpStatus.OK);

          expect(metricService.aggregateMetrics).toHaveBeenCalledTimes(1);
          expect(metricService.aggregateMetrics).toHaveBeenCalledWith(scale, {
            startDate: date,
            endDate: date,
            user: user._id?.toString(),
            apiDef,
            sourceId,
          });
        });
      });
    });
  });
});
