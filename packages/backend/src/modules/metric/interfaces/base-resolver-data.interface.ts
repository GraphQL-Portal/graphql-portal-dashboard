import { MetricsChannels } from '@graphql-portal/types';

export default interface IBaseResolverData {
  event: MetricsChannels,
  info: any,
  args: any,
  path: string,
  source: string | undefined,
  date: number,
}