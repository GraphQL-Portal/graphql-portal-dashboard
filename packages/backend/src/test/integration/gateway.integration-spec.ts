import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as mongoose from 'mongoose';
import GatewayService from '../../modules/gateway/gateway.service';
import supertest from 'supertest';
import AppModule from '../../modules/app.module';
import { createUser, Method, requestTo, RequestToResult } from '../common';
import HeadersEnum from '../../common/enum/headers.enum';
import IGateway from '../../common/interface/gateway.interface';
import UserService from '../../modules/user/user.service';
import ITokens from '../../modules/user/interfaces/tokens.interface';
import IUser from '../../common/interface/user.interface';

jest.mock('ioredis');

describe('GatewayResolver', () => {
  let request: RequestToResult;
  let app: INestApplication;
  let user: IUser & ITokens;
  let gatewayService: GatewayService;
  let userService: UserService;

  const gatewayExample: IGateway = {
    nodeId: 'nodeId',
    configTimestamp: Date.now(),
    hostname: 'test.local',
    status: 'active',
    lastPingAt: Date.now(),
  };

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

    userService = app.get<UserService>(UserService);

    user = await createUser(userService);
  });

  afterAll(async () => {
    await app.close();
  });

  afterEach(() => jest.clearAllMocks());

  describe('GraphQL', () => {
    let graphQlRequest: (query: string, variables?: any, headers?: any) => supertest.Test;

    beforeAll(() => {
      graphQlRequest = (
        query: string,
        variables = {},
        headers = { [HeadersEnum.AUTHORIZATION]: user.accessToken }
      ): supertest.Test => request(Method.post, '/graphql').set(headers).send({ query, variables });
    });

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
