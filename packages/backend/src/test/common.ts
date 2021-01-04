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

export const requestTo = (app: INestApplication) => (method: Method, route: string): RequestResult =>
  supertest(app.getHttpServer())[method](route);

export const randomObjectId = () => new ObjectId().toHexString();

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
  endpoint: 'http://endpoint/graphql',
  sources: [sourceExample],
};

export const sourceSchema = {
  name: expect.any(String),
  handler: {
    graphql: { endpoint: expect.any(String) },
  },
  transforms: expect.anything(),
};

export const apiDefSchema = {
  name: expect.any(String),
  endpoint: expect.any(String),
};

export const createUser = async (service: UserService,
  role = Roles.USER,
  email = randomEmail(),
  password = 'Secret123',
): Promise<IUser & ITokens> => {
  const tokens = await service.register({
    email,
    password,
    role
  }, randomString());

  const user = await service.findByEmail(email);

  return {
    ...(user!.toJSON()),
    ...tokens,
  }
};

export const expectSource = (source: ISourceDocument): void =>
  expect(source.toJSON()).toMatchObject({ ...sourceSchema, ...mongoDocumentSchema });

export const expectTokens = (result: ITokens) =>
  expect(result).toMatchObject({
    accessToken: expect.any(String),
    refreshToken: expect.any(String),
  });

export const expectApiDef = (apiDef: IApiDefDocument): void => {
  expect(apiDef.toJSON()).toMatchObject({
    ...apiDefSchema,
    ...mongoDocumentSchema,
    sources: expect.anything(),
  });
  apiDef.sources.forEach((source) => {
    expectSource(source);
  });
};
