import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as mongoose from 'mongoose';
import { config } from 'node-config-ts';
import supertest from 'supertest';
import HeadersEnum from '../../common/enum/headers.enum';
import Roles from '../../common/enum/roles.enum';
import IUser from '../../common/interface/user.interface';
import { LoggerService } from '../../common/logger';
import { randomString } from '../../common/tool';
import AppModule from '../../modules/app.module';
import ITokens from '../../modules/user/interfaces/tokens.interface';
import UserService from '../../modules/user/user.service';
import { createUser, expectTokens, Method, requestTo, RequestToResult } from '../common';

jest.mock('ioredis');

jest.mock('@sendgrid/mail', () => ({
  setApiKey: jest.fn(),
  send: jest.fn(),
}));

jest.useFakeTimers();

describe('ApiDefResolver', () => {
  let request: RequestToResult;
  let app: INestApplication;
  let tokens: ITokens;
  let refreshToken: string;
  let userService: UserService;
  let admin: IUser & ITokens;
  let user: IUser;

  const device = randomString();
  const authenticationData = {
    email: `${randomString()}@email.com`,
    password: 'Secret123',
    role: Roles.USER,
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({ imports: [AppModule] }).compile();

    app = moduleFixture.createNestApplication();
    app.useLogger(new LoggerService(config));
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
          `mutation($data: UserInput!) {
            register(data: $data)
          }`,
          { data: authenticationData, device }
        ).expect(HttpStatus.OK);

        const result = body?.data?.register;

        expect(result).toBeTruthy();
      });

      describe('login', () => {
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

          tokens = body.data.login;
          expectTokens(tokens);
          refreshToken = tokens.refreshToken;

          graphQlRequest = (
            query: string,
            variables = {},
            headers = { [HeadersEnum.AUTHORIZATION]: tokens.accessToken }
          ): supertest.Test => request(Method.post, '/graphql').set(headers).send({ query, variables });
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
              getUsers { _id email }
            }`,
            {}
          ).expect(HttpStatus.OK);

          const users = body.data.getUsers;
          user = users[0];
          expect(users).toBeDefined();
          expect(users).toHaveLength(1);
          expect(user.email).toBe(authenticationData.email);
        });
      });
    });
    describe('Reset password request and confirmation', () => {
      it('shoud call resetPasswordRequest', async () => {
        const spy = jest.spyOn(userService, 'resetPasswordRequest').mockResolvedValueOnce(true);
        const email = 'email';

        const { body } = await graphQlRequest(
          `mutation($email: String!) {
            resetPasswordRequest(email: $email)
          }`,
          { email }
        ).expect(HttpStatus.OK);
        expect(body.data.resetPasswordRequest).toBeTruthy();
        expect(spy).toBeCalledTimes(1);
        expect(spy).toBeCalledWith(email);
      });

      it('resetPassword', async () => {
        const spy = jest.spyOn(userService, 'resetPassword').mockResolvedValueOnce(true);
        const email = 'email';
        const password = 'password';
        const code = 'code';

        const { body } = await graphQlRequest(
          `mutation($email: String!, $code: String!, $password: String!) {
            resetPassword(email: $email, code: $code, password: $password)
          }`,
          { email, password, code }
        ).expect(HttpStatus.OK);
        expect(body.data.resetPassword).toBeTruthy();
        expect(spy).toBeCalledTimes(1);
        expect(spy).toBeCalledWith(email, code, password);
      });
    });

    describe('Block and unblock', () => {
      it('usen with role "user" cannot block anyone', async () => {
        const { body } = await graphQlRequest(
          `mutation($id: ID!) {
            blockUser(id: $id) { _id }
          }`,
          { id: user._id },
          {
            [HeadersEnum.AUTHORIZATION]: tokens.accessToken,
          }
        ).expect(HttpStatus.OK);

        expect(body.errors?.[0].message).toBe(`User role is: ${Roles.USER}, but required one of: ${Roles.ADMIN}`);
      });

      it('should block user', async () => {
        const { body } = await graphQlRequest(
          `mutation($id: ID!) {
            blockUser(id: $id) { _id }
          }`,
          { id: user._id }
        ).expect(HttpStatus.OK);

        expect(body.data.blockUser).toBeTruthy();
      });

      it('blocked user cannot login', async () => {
        const { body } = await graphQlRequest(
          `mutation($email: String!, $password: String!, $device: String!) {
            login(email: $email, password: $password, device: $device) {
              accessToken
              refreshToken
            }
          }`,
          { ...authenticationData, device }
        ).expect(HttpStatus.OK);

        expect(body.errors[0].message).toMatch('Wrong email or password');
      });

      it('should unblock user', async () => {
        const { body } = await graphQlRequest(
          `mutation($id: ID!) {
            unblockUser(id: $id) { _id }
          }`,
          { id: user._id }
        ).expect(HttpStatus.OK);

        expect(body.data.unblockUser).toBeTruthy();
      });

      it('user can login now', async () => {
        const { body } = await graphQlRequest(
          `mutation($email: String!, $password: String!, $device: String!) {
            login(email: $email, password: $password, device: $device) {
              accessToken
              refreshToken
            }
          }`,
          { ...authenticationData, device }
        ).expect(HttpStatus.OK);

        expectTokens(body.data.login);
      });
    });
    describe('Update', () => {
      it('usen with role "user" cannot update user data', async () => {
        const firstName = randomString();
        const { body } = await graphQlRequest(
          `mutation($id: ID!, $data: UpdateUserInput!) {
            updateUser(id: $id, data: $data) {
              firstName
            }
          }`,
          {
            id: user._id,
            data: {
              firstName
            }
          },
          {
            [HeadersEnum.AUTHORIZATION]: tokens.accessToken,
          }
        ).expect(HttpStatus.OK);

        expect(body.errors?.[0].message).toBe(`User role is: ${Roles.USER}, but required one of: ${Roles.ADMIN}`);
      });

      it('admin can update user data', async () => {
        const firstName = randomString();
        const { body } = await graphQlRequest(
          `mutation($id: ID!, $data: UpdateUserInput!) {
            updateUser(id: $id, data: $data) {
              firstName
            }
          }`,
          {
            id: user._id,
            data: {
              firstName
            }
          }
        ).expect(HttpStatus.OK);

        expect(body.data.updateUser.firstName).toBe(firstName);
      });
    });
    describe('Delete', () => {
      it('usen with role "user" cannot update user data', async () => {
        const { body } = await graphQlRequest(
          `mutation($id: ID!) {
            deleteUser(id: $id)
          }`,
          { id: user._id },
          {
            [HeadersEnum.AUTHORIZATION]: tokens.accessToken,
          }
        ).expect(HttpStatus.OK);

        expect(body.errors?.[0].message).toBe(`User role is: ${Roles.USER}, but required one of: ${Roles.ADMIN}`);
      });

      it('admin can delete user', async () => {
        const { body } = await graphQlRequest(
          `mutation($id: ID!) {
            deleteUser(id: $id)
          }`,
          { id: user._id }
        ).expect(HttpStatus.OK);

        expect(body.data.deleteUser).toBeTruthy();
      });

      it('user does not appears in user list anymore', async () => {
        const { body } = await graphQlRequest(
          `query {
            getUsers { _id email }
          }`,
          {}
        ).expect(HttpStatus.OK);

        expect(body.data.getUsers).toHaveLength(0);
      });
    });
  });
});
