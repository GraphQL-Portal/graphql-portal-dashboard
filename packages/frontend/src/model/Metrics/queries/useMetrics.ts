import { useQuery, gql } from '@apollo/client';
import { FullApiMetric, QueryHook } from '../../../types';

export const QUERY_METRICS = gql`
  query getAPIMetrics(
    $chunks: [Timestamp]
    $filters: MetricFilter!
    $slowestRequestsFilters: MetricAggregateFilters!
    $countryFilters: MetricAggregateFilters!
    $limit: Int
  ) {
    getChunkedAPIMetrics(chunks: $chunks, filters: $filters) {
      chunk
      count
      avgLatency
      successes
      failures
    }
    getCountryMetrics(filters: $countryFilters, limit: $limit) {
      country
      count
    }
    getApiAndSourcesLatencies(chunks: $chunks, filters: $filters)
    getSlowestRequests(filters: $slowestRequestsFilters) {
      requestId
      nodeId
      query
      userAgent
      ip
      request
      geo
      rawResponseBody
      requestDate
      responseDate
      latency
      contentLength
      error
      apiName
      apiDef
      user
    }
  }
`;

export const useMetricsQuery: QueryHook<FullApiMetric> = (options = {}) => {
  const { data, loading, error } = useQuery(QUERY_METRICS, options);

  return {
    data: data || {},
    loading,
    error,
  };
};
