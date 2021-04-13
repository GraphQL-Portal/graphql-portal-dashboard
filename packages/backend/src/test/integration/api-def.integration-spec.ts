import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as mongoose from 'mongoose';
import { config } from 'node-config-ts';
import Roles from '../../common/enum/roles.enum';
import supertest from 'supertest';
import HeadersEnum from '../../common/enum/headers.enum';
import IUser from '../../common/interface/user.interface';
import { LoggerService } from '../../common/logger';
import ApiDefService from '../../modules/api-def/api-def.service';
import AppModule from '../../modules/app.module';
import ITokens from '../../modules/user/interfaces/tokens.interface';
import TokenService from '../../modules/user/token.service';
import UserService from '../../modules/user/user.service';
import {
  apiDefExample,
  createUser,
  Method,
  requestTo,
  RequestToResult,
} from '../common';

jest.mock('ioredis');

describe('ApiDefResolver', () => {
  let request: RequestToResult;
  let app: INestApplication;
  let apiDefService: ApiDefService;
  let userService: UserService;
  let tokenService: TokenService;

  let user: IUser & ITokens;
  let admin: IUser & ITokens;
  let gatewayToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(ApiDefService)
      .useValue({
        publishApiDefsUpdated: jest.fn().mockResolvedValue(1),
        findAll: jest.fn().mockResolvedValue([apiDefExample]),
        findAllForGateway: jest.fn().mockResolvedValue([apiDefExample]),
        findAllByUser: jest.fn().mockResolvedValue([apiDefExample]),
        findById: jest.fn().mockResolvedValue(apiDefExample),
        create: jest.fn().mockResolvedValue(apiDefExample),
        update: jest.fn().mockResolvedValue(apiDefExample),
        delete: jest.fn().mockResolvedValue(true),
        isOwner: jest.fn().mockResolvedValue(true),
      })
      .compile();

    app = moduleFixture.createNestApplication();
    app.useLogger(new LoggerService(config));
    app.useGlobalPipes(new ValidationPipe());

    await app.init();

    request = requestTo(app);
    await Promise.all(mongoose.connections.map((c) => c.db?.dropDatabase()));
    apiDefService = app.get<ApiDefService>(ApiDefService);
    userService = app.get<UserService>(UserService);
    tokenService = app.get<TokenService>(TokenService);

    user = await createUser(userService);
    admin = await createUser(userService, Roles.ADMIN);
    await tokenService.generateGatewaySecret();
    gatewayToken = config.gateway.secret;
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
    const createApiDef = {
      ...apiDefExample,
      sources: undefined,
      user: undefined,
    };

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

    describe('getAllApiDefsForGateway', () => {
      it('should call findAllForGateway without config.gateway.token', async () => {
        config.gateway.secret = '';
        await graphQlRequest(
          `query {
            getAllApiDefsForGateway {
              timestamp
              apiDefs {
                name
                endpoint
                sources {
                  name
                  handler
                  transforms
                }
                schema_polling_interval
                schema_updates_through_control_api
                enable_ip_filtering
                allow_ips
                deny_ips
                request_size_limit
                depth_limit
                request_complexity_limit
                rate_limit {
                  complexity
                  per
                }
              }
            }
          }`,
          {},
          {}
        ).expect(HttpStatus.OK);

        expect(apiDefService.findAllForGateway).toHaveBeenCalledTimes(1);
      });

      it('return unauthorized without token with config.gateway.token', async () => {
        config.gateway.secret = await tokenService.generateGatewaySecret();
        const { body } = await graphQlRequest(
          `query {
            getAllApiDefsForGateway {
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

    describe('getAllApiDefs', () => {
      it('should call findAll for admin', async () => {
        await graphQlRequest(
          `query {
            getAllApiDefs {
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
          null,
          { [HeadersEnum.AUTHORIZATION]: admin.accessToken }
        ).expect(HttpStatus.OK);

        expect(apiDefService.findAll).toHaveBeenCalledTimes(1);
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

    describe('getApiDefs', () => {
      it('should call findAllByUser', async () => {
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

    describe('getApiDefById', () => {
      it('should call findById', async () => {
        await graphQlRequest(
          `query($id: String!) {
            getApiDefById(id: $id) {
              name
            }
          }`,
          { id: 'id' }
        ).expect(HttpStatus.OK);

        expect(apiDefService.findById).toHaveBeenCalledTimes(1);
      });
    });

    describe('createApiDef', () => {
      it('should call create', async () => {
        await graphQlRequest(
          `mutation($apiDef: CreateApiDef!, $sources:[ID!]!) {
            createApiDef(apiDef: $apiDef, sources: $sources) {
              apiDef {
                name
                endpoint
                sources {
                  _id
                  name
                  handler
                  transforms
                }
              }
              schema
            }
          }`,
          { apiDef: createApiDef, sources: [] }
        ).expect(HttpStatus.OK);

        expect(apiDefService.create).toHaveBeenCalledTimes(1);
        expect(apiDefService.create).toHaveBeenCalledWith(
          createApiDef,
          [],
          user._id
        );
      });
    });

    describe('updateApiDef', () => {
      it('should call update', async () => {
        await graphQlRequest(
          `mutation($id:ID!, $apiDef: CreateApiDef!, $sources:[ID!]!) {
            updateApiDef(id:$id, apiDef: $apiDef, sources: $sources) {
              apiDef {
                name
                endpoint
                sources {
                  _id
                  name
                  handler
                  transforms
                }
              }
              schema
            }
          }`,
          { id: createApiDef._id, apiDef: createApiDef, sources: [] }
        ).expect(HttpStatus.OK);

        expect(apiDefService.update).toHaveBeenCalledTimes(1);
        expect(apiDefService.update).toHaveBeenCalledWith(
          createApiDef._id,
          createApiDef,
          []
        );
      });
      it('another user cant update service', async () => {
        jest.spyOn(apiDefService, 'isOwner').mockResolvedValueOnce(false);
        const anotherUser = await createUser(userService);

        const { body } = await graphQlRequest(
          `mutation($id:ID!, $apiDef: CreateApiDef!, $sources:[ID!]!) {
            updateApiDef(id:$id, apiDef: $apiDef, sources: $sources) {
              apiDef {
                name
                endpoint
                sources {
                  _id
                  name
                  handler
                  transforms
                }
              }
              schema
            }
          }`,
          { id: createApiDef._id, apiDef: createApiDef, sources: [] },
          { [HeadersEnum.AUTHORIZATION]: anotherUser.accessToken }
        ).expect(HttpStatus.OK);

        expect(apiDefService.update).toHaveBeenCalledTimes(0);
        expect(body.errors[0].message).toMatch(
          'You do not have access to do this'
        );
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
