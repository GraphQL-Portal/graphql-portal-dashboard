import { MetricsChannels } from '@graphql-portal/types';
import { IResolverCalled, IResolverDone, IResolverError } from '.';

export default interface IReducedResolver {
  path: string,
  latency?: number,
  [MetricsChannels.RESOLVER_CALLED]?: IResolverCalled,
  [MetricsChannels.RESOLVER_DONE]?: IResolverDone,
  [MetricsChannels.RESOLVER_ERROR]?: IResolverError,
}