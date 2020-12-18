import { Source } from '@graphql-mesh/types/config';

export default interface IApiDef {
  createdAt?: Date;
  updatedAt?: Date;
  name: string;
  endpoint: string;
  sources: Source[];
}
