import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as mongoose from 'mongoose';
import supertest from 'supertest';
import HeadersEnum from '../../common/enum/headers.enum';
import IUser from '../../common/interface/user.interface';
import AppModule from '../../modules/app.module';
import SourceService from '../../modules/source/source.service';
import ITokens from '../../modules/user/interfaces/tokens.interface';
import UserService from '../../modules/user/user.service';
import {
  createUser,
  Method,
  randomObjectId,
  requestTo,
  RequestToResult,
  sourceExample,
} from '../common';

jest.mock('ioredis');

describe('SourceResolver', () => {
  let request: RequestToResult;
  let app: INestApplication;
  let sourceService: SourceService;
  let userService: UserService;
  let user: IUser & ITokens;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(SourceService)
      .useValue({
        findAllByUser: jest.fn().mockResolvedValue([sourceExample]),
        getSchemaById: jest.fn().mockResolvedValue('schema'),
        create: jest.fn().mockResolvedValue(sourceExample),
        update: jest.fn().mockResolvedValue(sourceExample),
        delete: jest.fn().mockResolvedValue(true),
        deleteByName: jest.fn().mockResolvedValue(true),
        isOwner: jest.fn().mockResolvedValue(true),
      })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    request = requestTo(app);
    await Promise.all(mongoose.connections.map((c) => c.db?.dropDatabase()));
    sourceService = app.get<SourceService>(SourceService);
    userService = app.get<UserService>(UserService);

    user = await createUser(userService);
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

        expect(sourceService.findAllByUser).toHaveBeenCalledTimes(1);
        expect(sourceService.findAllByUser).toHaveBeenCalledWith(user._id);
      });
    });

    describe('getSourceSchema', () => {
      it('should call getSchemaById', async () => {
        const id = randomObjectId().toString();
        await graphQlRequest(
          `query($id: ID!) {
            getSourceSchema(id: $id)
          }`,
          { id }
        ).expect(HttpStatus.OK);

        expect(sourceService.getSchemaById).toHaveBeenCalledTimes(1);
        expect(sourceService.getSchemaById).toHaveBeenCalledWith(id);
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
        expect(sourceService.create).toHaveBeenCalledWith(
          sourceExample,
          user._id
        );
      });
    });

    describe('updateSource', () => {
      it('should call update', async () => {
        await graphQlRequest(
          `mutation($id:ID!, $source: CreateSource!) {
            updateSource(id: $id, source: $source) {
              _id
              name
            }
          }`,
          { id: sourceExample._id, source: sourceExample }
        ).expect(HttpStatus.OK);

        expect(sourceService.update).toHaveBeenCalledTimes(1);
        expect(sourceService.update).toHaveBeenCalledWith(
          sourceExample._id,
          sourceExample
        );
      });
    });

    describe('deleteSource', () => {
      it('should call update', async () => {
        await graphQlRequest(
          `mutation($id:ID!){
            deleteSource(id:$id)
          }`,
          { id: sourceExample._id }
        ).expect(HttpStatus.OK);

        expect(sourceService.delete).toHaveBeenCalledTimes(1);
        expect(sourceService.delete).toHaveBeenCalledWith(sourceExample._id);
      });
    });

    describe('deleteSourceByName', () => {
      it('should call update', async () => {
        await graphQlRequest(
          `mutation($name:String!){
            deleteSourceByName(name:$name)
          }`,
          { name: sourceExample.name }
        ).expect(HttpStatus.OK);

        expect(sourceService.deleteByName).toHaveBeenCalledTimes(1);
        expect(sourceService.deleteByName).toHaveBeenCalledWith(
          sourceExample.name
        );
      });
    });
  });
});
