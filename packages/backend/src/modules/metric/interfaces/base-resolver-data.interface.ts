import { MetricsChannels } from '@graphql-portal/types';

export default interface IBaseResolverData {
  event: MetricsChannels;
  path: string;
  source: string;
  date: number;
}
