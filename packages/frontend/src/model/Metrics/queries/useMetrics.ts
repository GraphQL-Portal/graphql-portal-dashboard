import { useQuery, gql } from '@apollo/client';

export const QUERY_METRICS = gql`
  query getMetrics($startDate: Timestamp!, $endDate: Timestamp!, $scale: String) {
    getMetrics(startDate: $startDate, endDate: $endDate, scale: $scale) {
      latency {
        argument
        value
      }
      count {
        argument
        value
      }
      countries {
        argument
        value
      }
    }
  }
`;

export const useMetricsQuery = (startDate: Date, endDate: Date, scale: 'day' | 'hour' | 'week' | 'month' = 'day') => {
  const { data, loading, error, refetch } = useQuery(QUERY_METRICS, {
    variables: { scale, startDate: startDate.getTime(), endDate: endDate.getTime() },
  });

  return {
    data,
    loading,
    refetch,
    error,
  };
};
