import { MetricsChannels } from '@graphql-portal/types';
import IBaseResolverData from './base-resolver-data.interface';

export default interface IResolverCalled extends IBaseResolverData {
  event: MetricsChannels.RESOLVER_CALLED;
  info: any;
  args: any;
}
