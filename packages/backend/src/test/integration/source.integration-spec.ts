import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as mongoose from 'mongoose';
import SourceService from '../../modules/source/source.service';
import supertest from 'supertest';
import AppModule from '../../modules/app.module';
import { Method, requestTo, RequestToResult, sourceExample } from '../common';

describe('SourceResolver', () => {
  let request: RequestToResult;
  let app: INestApplication;
  let sourceService: SourceService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({ imports: [AppModule] })
      .overrideProvider(SourceService)
      .useValue({
        findAll: jest.fn().mockResolvedValue([sourceExample]),
        create: jest.fn().mockResolvedValue(sourceExample),
        update: jest.fn().mockResolvedValue(sourceExample),
        delete: jest.fn().mockResolvedValue(true),
      })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    await app.listen(4000);

    request = requestTo(app);
    await Promise.all(mongoose.connections.map((c) => c.db?.dropDatabase()));
    sourceService = app.get<SourceService>(SourceService);
  });

  afterAll(async () => {
    await app.close();
  });

  afterEach(() => jest.clearAllMocks());

  describe('GraphQL', () => {
    const graphQlRequest = (query: string, variables = {}, headers = {}): supertest.Test =>
      request(Method.post, '/graphql').set(headers).send({ query, variables });

    describe('getSources', () => {
      it('should call findAll', async () => {
        await graphQlRequest(
          `query {
            getSources {
              _id
              name
              handler
              transforms
            }
          }`
        ).expect(HttpStatus.OK);

        expect(sourceService.findAll).toHaveBeenCalledTimes(1);
      });
    });

    describe('createSource', () => {
      it('should call create', async () => {
        await graphQlRequest(
          `mutation($source: CreateSource!) {
            createSource(source: $source) {
              name
              handler
              transforms
            }
          }`,
          { source: sourceExample }
        ).expect(HttpStatus.OK);

        expect(sourceService.create).toHaveBeenCalledTimes(1);
        expect(sourceService.create).toHaveBeenCalledWith(sourceExample);
      });
    });

    describe('updateSource', () => {
      it('should call update', async () => {
        await graphQlRequest(
          `mutation($name:String!, $source: CreateSource!) {
            updateSource(name: $name, source: $source) {
              _id
              name
            }
          }`,
          { name: sourceExample.name, source: sourceExample }
        ).expect(HttpStatus.OK);

        expect(sourceService.update).toHaveBeenCalledTimes(1);
        expect(sourceService.update).toHaveBeenCalledWith(sourceExample.name, sourceExample);
      });
    });

    describe('deleteSource', () => {
      it('should call update', async () => {
        await graphQlRequest(
          `mutation($name:String!){
            deleteSource(name:$name)
          }`,
          { name: sourceExample.name }
        ).expect(HttpStatus.OK);

        expect(sourceService.delete).toHaveBeenCalledTimes(1);
        expect(sourceService.delete).toHaveBeenCalledWith(sourceExample.name);
      });
    });
  });
});
