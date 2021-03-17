import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as mongoose from 'mongoose';
import Roles from '../../common/enum/roles.enum';
import supertest from 'supertest';
import HeadersEnum from '../../common/enum/headers.enum';
import IUser from '../../common/interface/user.interface';
import AppModule from '../../modules/app.module';
import LogService from '../../modules/log/log.service';
import ITokens from '../../modules/user/interfaces/tokens.interface';
import UserService from '../../modules/user/user.service';
import { createUser, Method, requestTo, RequestToResult } from '../common';

jest.mock('ioredis');

describe('LogResolver', () => {
  let request: RequestToResult;
  let app: INestApplication;
  let admin: IUser & ITokens;
  let logService: LogService;
  let userService: UserService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(LogService)
      .useValue({
        getLatestLogs: jest.fn().mockResolvedValue([]),
      })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    request = requestTo(app);
    await Promise.all(mongoose.connections.map((c) => c.db?.dropDatabase()));
    logService = app.get<LogService>(LogService);

    userService = app.get<UserService>(UserService);

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
        headers = { [HeadersEnum.AUTHORIZATION]: admin.accessToken }
      ): supertest.Test =>
        request(Method.post, '/graphql')
          .set(headers)
          .send({ query, variables });
    });

    describe('getLatestLogs', () => {
      it('should call getLatestLogs', async () => {
        await graphQlRequest(
          `query {
            getLatestLogs { 
              nodeId
            }
          }`
        ).expect(HttpStatus.OK);

        expect(logService.getLatestLogs).toHaveBeenCalledTimes(1);
      });
    });
  });
});
