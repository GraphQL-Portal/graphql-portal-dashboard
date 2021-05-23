import { useQuery, gql } from '@apollo/client';
import { FullApiMetric, QueryHook } from '../../../types';

export const QUERY_METRICS = gql`
  query getAPIMetrics(
    $chunks: [Timestamp]
    $filters: MetricFilter!
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
    getSlowestRequests(filters: $filters) {
      latency
      error
      query
      requestDate
      apiDef
      apiName
      resolver {
        error
        latency
        path
        source
        sourceId
      }
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
