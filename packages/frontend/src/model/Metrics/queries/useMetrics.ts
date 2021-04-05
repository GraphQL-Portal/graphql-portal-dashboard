import { useQuery, gql } from '@apollo/client';
import { FullApiMetric, QueryHook } from '../../../types';

export const QUERY_METRICS = gql`
  query getAPIMetrics(
    $chunks: [Timestamp]
    $filters: MetricFilter!
    $startDate: Timestamp!
    $endDate: Timestamp!
    $limit: Int
  ) {
    getChunkedAPIMetrics(chunks: $chunks, filters: $filters) {
      chunk
      count
      avgLatency
      successes
      failures
    }
    getCountryMetrics(
      startDate: $startDate
      endDate: $endDate
      filters: $filters
      limit: $limit
    ) {
      country
      count
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
