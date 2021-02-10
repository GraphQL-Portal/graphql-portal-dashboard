import { useQuery, gql } from '@apollo/client';

export const QUERY_METRICS = gql`
  query metrics($startDate: Timestamp!, $endDate: Timestamp!, $scale: String) {
    metrics(startDate: $startDate, endDate: $endDate, scale: $scale) {
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
      failures {
        argument
        failure
        success
      }
    }
  }
`;

export const useMetricsQuery = (
  startDate: Date,
  endDate: Date,
  scale: 'day' | 'hour' | 'week' | 'month' = 'day'
) => {
  const { data, loading, error, refetch } = useQuery(QUERY_METRICS, {
    variables: {
      scale,
      startDate: startDate.getTime(),
      endDate: endDate.getTime(),
    },
  });

  return {
    data: data?.metrics,
    loading,
    error,
    refetch: (variables: {
      startDate: Date;
      endDate: Date;
      scale: 'day' | 'hour' | 'week' | 'month';
    }) =>
      refetch({
        startDate: variables.startDate.getTime(),
        endDate: variables.endDate.getTime(),
        scale: variables.scale,
      }),
  };
};
