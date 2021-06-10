import { Args, Query, Resolver } from '@nestjs/graphql';
import { AuthorizationParam, Roles } from '../../common/decorators';
import RolesEnum from '../../common/enum/roles.enum';
import {
  IAggregateFilters,
  IApiActivity,
  IAPIMetric,
  IMetricFilter,
} from './interfaces';
import MetricService from './metric.service';
import ICountryMetric from './interfaces/country-metric.interface';
import { IRequestMetricDocument } from 'src/data/schema/request-metric.schema';

@Resolver('Metric')
export default class MetricResolver {
  public constructor(private readonly metricService: MetricService) {}

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
  public getSlowestRequests(
    @Args('filters') filters: IAggregateFilters
  ): Promise<IRequestMetricDocument[]> {
    return this.metricService.getSlowestRequests(filters);
  }

  @Query()
  @Roles([RolesEnum.USER])
  public getChunkedAPIMetrics(
    @AuthorizationParam('_id') user: string,
    @Args('chunks') chunks: Date[],
    @Args('filters') filters: IMetricFilter
  ): Promise<IAPIMetric[]> {
    return this.metricService.getChunkedAPIMetrics(chunks, {
      ...filters,
      user,
    });
  }

  @Query()
  @Roles([RolesEnum.USER])
  public getApiAndSourcesLatencies(
    @AuthorizationParam('_id') user: string,
    @Args('chunks') chunks: Date[],
    @Args('filters') filters: IMetricFilter
  ): Promise<Record<string, number>[]> {
    return this.metricService.getApiAndSourcesLatencies(chunks, {
      ...filters,
      user,
    });
  }

  @Query()
  @Roles([RolesEnum.USER])
  public getCountryMetrics(
    @AuthorizationParam('_id') user: string,
    @Args('filters') filters: IAggregateFilters,
    @Args('limit') limit?: number
  ): Promise<ICountryMetric[]> {
    return this.metricService.getCountryMetrics({ ...filters, user }, limit);
  }
}
