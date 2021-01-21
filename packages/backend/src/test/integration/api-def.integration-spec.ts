import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as mongoose from 'mongoose';
import { config } from 'node-config-ts';
import supertest from 'supertest';
import HeadersEnum from '../../common/enum/headers.enum';
import IUser from '../../common/interface/user.interface';
import { LoggerService } from '../../common/logger';
import ApiDefService from '../../modules/api-def/api-def.service';
import AppModule from '../../modules/app.module';
import ITokens from '../../modules/user/interfaces/tokens.interface';
import UserService from '../../modules/user/user.service';
import { apiDefExample, createUser, Method, requestTo, RequestToResult } from '../common';

jest.mock('ioredis');

jest.useFakeTimers();

describe('ApiDefResolver', () => {
  let request: RequestToResult;
  let app: INestApplication;
  let apiDefService: ApiDefService;
  let userService: UserService;
  let user: IUser & ITokens;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({ imports: [AppModule] })
      .overrideProvider(ApiDefService)
      .useValue({
        publishApiDefsUpdated: jest.fn().mockResolvedValue(1),
        findAll: jest.fn().mockResolvedValue([apiDefExample]),
        findAllByUser: jest.fn().mockResolvedValue([apiDefExample]),
        create: jest.fn().mockResolvedValue(apiDefExample),
        update: jest.fn().mockResolvedValue(apiDefExample),
        delete: jest.fn().mockResolvedValue(true),
        isOwner: jest.fn().mockResolvedValue(true),
      })
      .compile();

    app = moduleFixture.createNestApplication();
    app.useLogger(new LoggerService(config));
    await app.init();

    request = requestTo(app);
    await Promise.all(mongoose.connections.map((c) => c.db?.dropDatabase()));
    apiDefService = app.get<ApiDefService>(ApiDefService);
    userService = app.get<UserService>(UserService);

    user = await createUser(userService);
  });

  afterAll(async () => {
    await app.close();
  });

  afterEach(() => jest.clearAllMocks());

  describe('GraphQL', () => {
    let graphQlRequest: (query: string, variables?: any, headers?: any) => supertest.Test;
    const createApiDef = { ...apiDefExample, sources: undefined };

    beforeAll(() => {
      graphQlRequest = (
        query: string,
        variables = {},
        headers = { [HeadersEnum.AUTHORIZATION]: user.accessToken }
      ): supertest.Test => request(Method.post, '/graphql').set(headers).send({ query, variables });
    });

    describe('getApiDefs', () => {
      it('should call findAll', async () => {
        await graphQlRequest(
          `query {
            getApiDefs {
              timestamp
              apiDefs {
                name
                endpoint
                sources {
                  name
                  handler
                  transforms
                }
              }
            }
          }`
        ).expect(HttpStatus.OK);

        expect(apiDefService.findAllByUser).toHaveBeenCalledTimes(1);
      });

      it('return unauthorized without token', async () => {
        const { body } = await graphQlRequest(
          `query {
            getApiDefs {
              timestamp
              apiDefs {
                name
                endpoint
                sources {
                  name
                  handler
                  transforms
                }
              }
            }
          }`,
          {},
          {}
        ).expect(HttpStatus.OK);

        expect(body.errors[0].extensions.code).toBe('UNAUTHENTICATED');
        expect(apiDefService.findAllByUser).toHaveBeenCalledTimes(0);
      });
    });

    describe('createApiDef', () => {
      it('should call create', async () => {
        await graphQlRequest(
          `mutation($apiDef: CreateApiDef!, $sources:[ID!]!) {
            createApiDef(apiDef: $apiDef, sources: $sources) {
              name
              endpoint
              sources {
                _id
                name
                handler
                transforms
              }
            }
          }`,
          { apiDef: createApiDef, sources: [] }
        ).expect(HttpStatus.OK);

        expect(apiDefService.create).toHaveBeenCalledTimes(1);
        expect(apiDefService.create).toHaveBeenCalledWith(createApiDef, [], user._id);
      });
    });

    describe('updateApiDef', () => {
      it('should call update', async () => {
        await graphQlRequest(
          `mutation($id:ID!, $apiDef: CreateApiDef!, $sources:[ID!]!) {
            updateApiDef(id:$id, apiDef: $apiDef, sources: $sources) {
              name
              endpoint
              sources {
                _id
                name
                handler
                transforms
              }
            }
          }`,
          { id: createApiDef._id, apiDef: createApiDef, sources: [] }
        ).expect(HttpStatus.OK);

        expect(apiDefService.update).toHaveBeenCalledTimes(1);
        expect(apiDefService.update).toHaveBeenCalledWith(createApiDef._id, createApiDef, []);
      });
      it('another user cant update service', async () => {
        jest.spyOn(apiDefService, 'isOwner').mockResolvedValueOnce(false);
        const anotherUser = await createUser(userService);

        const { body } = await graphQlRequest(
          `mutation($id:ID!, $apiDef: CreateApiDef!, $sources:[ID!]!) {
            updateApiDef(id:$id, apiDef: $apiDef, sources: $sources) {
              name
              endpoint
              sources {
                _id
                name
                handler
                transforms
              }
            }
          }`,
          { id: createApiDef._id, apiDef: createApiDef, sources: [] },
          { [HeadersEnum.AUTHORIZATION]: anotherUser.accessToken }
        ).expect(HttpStatus.OK);

        expect(apiDefService.update).toHaveBeenCalledTimes(0);
        expect(body.errors[0].message).toMatch('You do not have access to do this');
      });
    });

    describe('deleteApiDef', () => {
      it('should call delete', async () => {
        await graphQlRequest(
          `mutation($id:ID!){
            deleteApiDef(id:$id)
          }`,
          { id: createApiDef._id }
        ).expect(HttpStatus.OK);

        expect(apiDefService.delete).toHaveBeenCalledTimes(1);
        expect(apiDefService.delete).toHaveBeenCalledWith(createApiDef._id);
      });
    });
  });
});
