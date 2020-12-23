import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as mongoose from 'mongoose';
import ApiDefService from '../../modules/api-def/api-def.service';
import supertest from 'supertest';
import AppModule from '../../modules/app.module';
import { Method, requestTo, RequestToResult, apiDefExample } from '../common';

jest.mock('ioredis');

describe('ApiDefResolver', () => {
  let request: RequestToResult;
  let app: INestApplication;
  let apiDefService: ApiDefService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({ imports: [AppModule] })
      .overrideProvider(ApiDefService)
      .useValue({
        publishApiDefsUpdated: jest.fn().mockResolvedValue(1),
        findAll: jest.fn().mockResolvedValue([apiDefExample]),
        create: jest.fn().mockResolvedValue(apiDefExample),
        update: jest.fn().mockResolvedValue(apiDefExample),
        delete: jest.fn().mockResolvedValue(true),
      })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    request = requestTo(app);
    await Promise.all(mongoose.connections.map((c) => c.db?.dropDatabase()));
    apiDefService = app.get<ApiDefService>(ApiDefService);
  });

  afterAll(async () => {
    await app.close();
  });

  afterEach(() => jest.clearAllMocks());

  describe('GraphQL', () => {
    const graphQlRequest = (query: string, variables = {}, headers = {}): supertest.Test =>
      request(Method.post, '/graphql').set(headers).send({ query, variables });
    const createApiDef = { ...apiDefExample, sources: undefined };

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

        expect(apiDefService.findAll).toHaveBeenCalledTimes(1);
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
        expect(apiDefService.create).toHaveBeenCalledWith(createApiDef, []);
      });
    });

    describe('updateApiDef', () => {
      it('should call update', async () => {
        await graphQlRequest(
          `mutation($name:String!, $apiDef: CreateApiDef!, $sources:[ID!]!) {
            updateApiDef(name:$name, apiDef: $apiDef, sources: $sources) {
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
          { name: createApiDef.name, apiDef: createApiDef, sources: [] }
        ).expect(HttpStatus.OK);

        expect(apiDefService.update).toHaveBeenCalledTimes(1);
        expect(apiDefService.update).toHaveBeenCalledWith(createApiDef.name, createApiDef, []);
      });
    });

    describe('deleteApiDef', () => {
      it('should call update', async () => {
        await graphQlRequest(
          `mutation($name:String!){
            deleteApiDef(name:$name)
          }`,
          { name: createApiDef.name }
        ).expect(HttpStatus.OK);

        expect(apiDefService.delete).toHaveBeenCalledTimes(1);
        expect(apiDefService.delete).toHaveBeenCalledWith(createApiDef.name);
      });
    });
  });
});
