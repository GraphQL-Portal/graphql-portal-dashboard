import { Args, Query, Resolver } from '@nestjs/graphql';
import { AuthorizationParam, Roles } from '../../common/decorators';
import RolesEnum from '../../common/enum/roles.enum';
import {
  IAggregateFilters,
  IApiActivity,
  IAPIMetric,
  IMetric,
  IMetricFilter,
} from './interfaces';
import MetricService from './metric.service';

@Resolver('Metric')
export default class MetricResolver {
  public constructor(private readonly metricService: MetricService) {}

  @Query()
  @Roles([RolesEnum.ADMIN])
  public metrics(
    @Args('filters') filters: IAggregateFilters,
    @Args('scale') scale: 'day' | 'week' | 'month' | 'hour'
  ): Promise<IMetric> {
    return this.metricService.aggregateMetrics(scale, filters);
  }

  @Query()
  @Roles([RolesEnum.USER])
  public getUserMetrics(
    @Args('filters') filters: IAggregateFilters,
    @AuthorizationParam('_id') user: string,
    @Args('scale') scale: 'day' | 'week' | 'month' | 'hour'
  ): Promise<IMetric> {
    return this.metricService.aggregateMetrics(scale, { ...filters, user });
  }

  @Query()
  @Roles([RolesEnum.USER])
  public getApiActivity(
    @AuthorizationParam('_id') user: string,
    @Args('filters') filters: IAggregateFilters
  ): Promise<IApiActivity[]> {
    return this.metricService.getApiActivity({ ...filters, user });
  }

  @Query()
  @Roles([RolesEnum.USER])
  public getChunkedAPIMetrics(
    @AuthorizationParam('_id') user: string,
    @Args('chunks') chunks: Date[],
    @Args('filters') filters: IMetricFilter
  ): Promise<IAPIMetric> {
    return this.metricService.getChunkedAPIMetrics(chunks, {
      ...filters,
      user,
    });
  }
}
