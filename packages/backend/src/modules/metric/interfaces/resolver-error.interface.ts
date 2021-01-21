import { MetricsChannels } from '@graphql-portal/types';
import IBaseResolverData from './base-resolver-data.interface';

export default interface IResolverError extends IBaseResolverData {
  event: MetricsChannels.RESOLVER_ERROR;
  error: Error | string;
}
