import { ApiDef } from '@graphql-portal/types';

export default interface IApiDef extends ApiDef {
  createdAt?: Date;
  updatedAt?: Date;
}
