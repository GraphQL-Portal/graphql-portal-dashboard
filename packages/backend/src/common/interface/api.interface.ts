import { Source } from '@graphql-mesh/types/config';

export default interface IApi {
  name: string;
  endpoint: string;
  sources: Source[];
}
