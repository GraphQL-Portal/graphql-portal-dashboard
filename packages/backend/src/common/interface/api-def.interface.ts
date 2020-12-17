import { Source } from '@graphql-mesh/types/config';

export default interface IApiDef {
  name: string;
  endpoint: string;
  sources: Source[];
}
