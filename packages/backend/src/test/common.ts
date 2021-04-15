import { SourceConfig } from '@graphql-portal/types';
import { INestApplication } from '@nestjs/common';
import supertest from 'supertest';
import { ObjectId } from 'mongodb';
import IApiDef from '../common/interface/api-def.interface';
import { IApiDefDocument } from '../data/schema/api-def.schema';
import { ISourceDocument } from '../data/schema/source.schema';
import { randomEmail, randomString } from '../common/tool';
import UserService from '../modules/user/user.service';
import Roles from '../common/enum/roles.enum';
import IUser from '../common/interface/user.interface';
import ITokens from '../modules/user/interfaces/tokens.interface';

export enum Method {
  get = 'get',
  post = 'post',
  put = 'put',
  delete = 'delete',
}

export type RequestResult = supertest.Test;
export type RequestToResult = (method: Method, route: string) => supertest.Test;

export const requestTo = (app: INestApplication) => (
  method: Method,
  route: string
): RequestResult => supertest(app.getHttpServer())[method](route);

export const randomObjectId = (): string => new ObjectId().toHexString();

export const mongoDocumentSchema = {
  _id: expect.anything(),
  createdAt: expect.any(Date),
  updatedAt: expect.any(Date),
};

export const sourceExample: SourceConfig = {
  _id: randomObjectId(),
  name: 'source',
  handler: {
    graphql: { endpoint: 'http://endpoint/graphql' },
  },
  transforms: [],
};

export const apiDefExample: IApiDef = {
  _id: randomObjectId(),
  name: 'api',
  endpoint: '/api',
  sources: [sourceExample],
  authentication: {
    auth_tokens: ['key'],
  },
  user: {
    _id: 'id',
  },
  playground: false,
  schema_polling_interval: 1,
  schema_updates_through_control_api: true,
  invalidate_cache_through_control_api: true,
  enable_ip_filtering: true,
  allow_ips: ['String'],
  deny_ips: ['String'],
  request_size_limit: 'String',
  depth_limit: 1,
  request_complexity_limit: 1,
  rate_limit: { complexity: 1, per: 1 },
};

export const sourceSchema = {
  ...mongoDocumentSchema,
  name: expect.any(String),
  handler: expect.any(String),
  transforms: expect.anything(),
};

export const apiDefSchema = {
  ...mongoDocumentSchema,
  name: expect.any(String),
  endpoint: expect.any(String),
  authentication: expect.any(String),
  playground: expect.any(Boolean),
  schema_polling_interval: expect.any(Number),
  schema_updates_through_control_api: expect.any(Boolean),
  invalidate_cache_through_control_api: expect.any(Boolean),
  enable_ip_filtering: expect.any(Boolean),
  allow_ips: expect.any(String),
  deny_ips: expect.any(String),
  request_size_limit: expect.any(String),
  depth_limit: expect.any(Number),
  request_complexity_limit: expect.any(Number),
  rate_limit: expect.any(Object),
};

export const createUser = async (
  service: UserService,
  role = Roles.USER,
  email = randomEmail(),
  password = 'Secret123'
): Promise<IUser & ITokens> => {
  jest.spyOn(service, 'sendEmailConfirmationCode').mockResolvedValue();
  await service.register({
    email,
    password,
    role,
  });
  jest.spyOn(service, 'isEmailNotConfirmed').mockResolvedValue(false);
  const tokens = await service.login(email, password, randomString());

  const user = await service.findByEmail(email);

  return {
    ...user!.toJSON(),
    ...tokens,
  };
};

export const expectSource = (source: ISourceDocument): void =>
  expect(source.toJSON()).toMatchObject(sourceSchema);

export const expectTokens = (result: ITokens): void =>
  expect(result).toMatchObject({
    accessToken: expect.any(String),
    refreshToken: expect.any(String),
  });

export const expectApiDef = (apiDef: IApiDefDocument): void => {
  expect(apiDef.toJSON()).toMatchObject({
    ...apiDefSchema,
    sources: expect.anything(),
  });
  apiDef.sources.forEach((source) => {
    expectSource(source);
  });
};
