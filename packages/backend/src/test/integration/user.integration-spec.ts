import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as mongoose from 'mongoose';
import supertest from 'supertest';
import AppModule from '../../modules/app.module';
import { createUser, expectTokens, Method, requestTo, RequestToResult } from '../common';
import HeadersEnum from '../../common/enum/headers.enum';
import { randomString } from '../../common/tool';
import ITokens from '../../modules/user/interfaces/tokens.interface';
import Roles from '../../common/enum/roles.enum';
import UserService from '../../modules/user/user.service';
import IUser from 'src/common/interface/user.interface';

jest.mock('ioredis');

describe('ApiDefResolver', () => {
  let request: RequestToResult;
  let app: INestApplication;
  let tokens: ITokens;
  let userService: UserService;
  let admin: IUser & ITokens;

  const device = randomString();
  const authenticationData = {
    email: `${randomString()}@email.com`,
    password: 'Secret123',
    role: Roles.USER,
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({ imports: [AppModule] }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    request = requestTo(app);
    await Promise.all(mongoose.connections.map((c) => c.db?.dropDatabase()));
    userService = app.get<UserService>(UserService);
    admin = await createUser(userService, Roles.ADMIN);
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
    });

    describe('register', () => {
      it('should call register', async () => {
        const { body } = await graphQlRequest(
          `mutation($data: UserInput!, $device: String!) {
            register(data: $data, device: $device) {
              accessToken
              refreshToken
            }
          }`,
          { data: authenticationData, device }
        ).expect(HttpStatus.OK);

        tokens = body?.data?.register;

        expect(tokens).toBeDefined();
        expectTokens(tokens);

        graphQlRequest = (
          query: string,
          variables = {},
          headers = { [HeadersEnum.AUTHORIZATION]: tokens.accessToken }
        ): supertest.Test => request(Method.post, '/graphql').set(headers).send({ query, variables });
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
            [HeadersEnum.AUTHORIZATION]: tokens.accessToken,
          }
        ).expect(HttpStatus.OK);

        expect(body.data.getProfile).toMatchObject({
          email: authenticationData.email,
          role: authenticationData.role,
        });
      });
    });

    describe('login', () => {
      let refreshToken: string;

      it('should return token', async () => {
        const { body } = await graphQlRequest(
          `mutation($email: String!, $password: String!, $device: String!) {
            login(email: $email, password: $password, device: $device) {
              accessToken
              refreshToken
            }
          }`,
          { ...authenticationData, device }
        ).expect(HttpStatus.OK);

        const tokens = body.data.login;
        expectTokens(tokens);
        refreshToken = tokens.refreshToken;
      });

      it('should throw error on invalid credentials', async () => {
        const { body } = await graphQlRequest(
          `mutation($email: String!, $password: String!, $device: String!) {
            login(email: $email, password: $password, device: $device) {
              accessToken
              refreshToken
            }
          }`,
          { ...authenticationData, password: 'wrong123', device }
        ).expect(HttpStatus.OK);

        expect(body.errors[0].message).toMatch('Wrong email or password');
      });

      describe('refreshTokens', () => {
        it('should not refresh tokens with invalid device', async () => {
          const { body } = await graphQlRequest(
            `mutation($refreshToken: String!, $device: String!) {
              refreshTokens(refreshToken: $refreshToken, device: $device) {
                accessToken
                refreshToken
              }
            }`,
            { refreshToken, device: 'invalid' }
          ).expect(HttpStatus.OK);

          expect(body.errors[0].message).toBe('Refresh token is invalid');
        });

        it('should refresh tokens', async () => {
          const { body } = await graphQlRequest(
            `mutation($refreshToken: String!, $device: String!) {
              refreshTokens(refreshToken: $refreshToken, device: $device) {
                accessToken
                refreshToken
              }
            }`,
            { refreshToken, device }
          ).expect(HttpStatus.OK);

          expectTokens(body.data.refreshTokens);
        });
      });

      describe('getUsers', () => {
        beforeAll(async () => {
          graphQlRequest = (
            query: string,
            variables = {},
            headers = { [HeadersEnum.AUTHORIZATION]: admin.accessToken }
          ): supertest.Test => request(Method.post, '/graphql').set(headers).send({ query, variables });
        });

        it('should throw error', async () => {
          const { body } = await graphQlRequest(
            `query { getUsers { email } }`,
            {},
            { [HeadersEnum.AUTHORIZATION]: tokens.accessToken }
          ).expect(HttpStatus.OK);

          expect(body.errors[0].message).toBe(`User role is: ${Roles.USER}, but required one of: ${Roles.ADMIN}`);
        });

        it('should return users', async () => {
          const { body } = await graphQlRequest(
            `query {
              getUsers { email }
            }`,
            {}
          ).expect(HttpStatus.OK);

          expect(body.data.getUsers).toBeDefined();
          expect(body.data.getUsers).toHaveLength(1);
          expect(body.data.getUsers[0].email).toBe(authenticationData.email);
        });
      });
    });
  });
});
