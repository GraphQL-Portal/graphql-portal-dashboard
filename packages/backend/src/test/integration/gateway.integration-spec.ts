import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as mongoose from 'mongoose';
import GatewayService from '../../modules/gateway/gateway.service';
import supertest from 'supertest';
import AppModule from '../../modules/app.module';
import { Method, requestTo, RequestToResult } from '../common';
import IGateway from '../../common/interface/gateway.interface';

jest.mock('ioredis');

describe('GatewayResolver', () => {
  let request: RequestToResult;
  let app: INestApplication;
  let gatewayService: GatewayService;

  const gatewayExample: IGateway = { nodeId: 'nodeId', configTimestamp: Date.now(), lastPingAt: Date.now() };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({ imports: [AppModule] })
      .overrideProvider(GatewayService)
      .useValue({
        findAll: jest.fn().mockResolvedValue([gatewayExample]),
      })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    request = requestTo(app);
    await Promise.all(mongoose.connections.map((c) => c.db?.dropDatabase()));
    gatewayService = app.get<GatewayService>(GatewayService);
  });

  afterAll(async () => {
    await app.close();
  });

  afterEach(() => jest.clearAllMocks());

  describe('GraphQL', () => {
    const graphQlRequest = (query: string, variables = {}, headers = {}): supertest.Test =>
      request(Method.post, '/graphql').set(headers).send({ query, variables });

    describe('getGateways', () => {
      it('should call findAll', async () => {
        await graphQlRequest(
          `query {
            getGateways { 
              nodeId
              lastPingAt
              configTimestamp
            }
          }`
        ).expect(HttpStatus.OK);

        expect(gatewayService.findAll).toHaveBeenCalledTimes(1);
      });
    });
  });
});
