import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as mongoose from 'mongoose';
import supertest from 'supertest';
import AppModule from '../../modules/app.module';
import { Method, requestTo, RequestToResult } from '../common';
import UserService from '../../modules/user/user.service';
import HeadersEnum from '../../common/enum/headers.enum';
import { randomString } from '../../common/tool';
import Roles from '../../common/enum/roles.enum';

jest.mock('ioredis');

describe('ApiDefResolver', () => {
  let request: RequestToResult;
  let app: INestApplication;
  let token: string;

  const authenticationData = {
    email: `${randomString()}@email.com`,
    password: 'Secret123',
    role: Roles.USER,
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({ imports: [AppModule] })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    request = requestTo(app);
    await Promise.all(mongoose.connections.map((c) => c.db?.dropDatabase()));
  });

  afterAll(async () => {
    await app.close();
  });

  afterEach(() => jest.clearAllMocks());

  describe('GraphQL', () => {
    let graphQlRequest: (query: string, variables?: any, headers?: any) => supertest.Test;

    beforeAll(() => {
      graphQlRequest = (query: string, variables = {}, headers = {}): supertest.Test =>
        request(Method.post, '/graphql').set(headers).send({ query, variables });
    })

    describe('register', () => {
      it('should call register', async () => {
        const { body } = await graphQlRequest(
          `mutation($data: UserInput!) {
            register(data: $data)
          }`,
          { data: authenticationData }
        ).expect(HttpStatus.OK);

        token = body?.data?.register;

        expect(token).toBeDefined();
      });

      it('should return user profile', async () => {
        const { body } = await graphQlRequest(
          `query {
            getProfile {
              firstName
              lastName
              role
              email
              createdAt
              updatedAt
            }
          }`,
          {},
          {
            [HeadersEnum.AUTHORIZATION]: token
          }
        ).expect(HttpStatus.OK);

        expect(body.data.getProfile).toMatchObject({
          email: authenticationData.email,
          role: authenticationData.role,
        });
      });
    });

    describe('login', () => {
      it('should return token', async () => {
        const { body } = await graphQlRequest(
          `mutation($email: String!, $password: String!) {
            login(email: $email, password: $password)
          }`,
          { ...authenticationData }
        ).expect(HttpStatus.OK);

        expect(body.data.login).toBeDefined();
      });
      it('should throw error on invalid credentials', async () => {
        const { body } = await graphQlRequest(
          `mutation($email: String!, $password: String!) {
            login(email: $email, password: $password)
          }`,
          { ...authenticationData, password: "wrong123" }
        ).expect(HttpStatus.OK);

        expect(body.errors[0].message).toMatch('Wrong email or password');
      });
    });
  });
});