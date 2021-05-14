import { ApiDef, ApiDefStatus } from '@graphql-portal/types';

export default interface IApiDef extends ApiDef {
  _id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  enabled?: boolean;
  status: ApiDefStatus;
}
