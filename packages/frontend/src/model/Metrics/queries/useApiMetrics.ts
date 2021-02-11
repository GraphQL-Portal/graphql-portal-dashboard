import { useQuery, gql } from '@apollo/client';

export const QUERY_METRICS = gql`
  query metrics($scale: String, $filters: MetricFilters!) {
    metrics(scale: $scale, filters: $filters) {
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

export const useApiMetricsQuery = (
  apiDef: string,
  startDate: Date,
  endDate: Date,
  scale: 'day' | 'hour' | 'week' | 'month' = 'day'
) => {
  const { data, loading, error, refetch } = useQuery(QUERY_METRICS, {
    variables: {
      scale,
      filters: {
        apiDef,
        startDate: startDate.getTime(),
        endDate: endDate.getTime(),
      },
    },
  });

  return {
    data: data?.metrics,
    loading,
    error,
    refetch: (variables: {
      apiDef: string;
      startDate: Date;
      endDate: Date;
      scale: 'day' | 'hour' | 'week' | 'month';
    }) =>
      refetch({
        filters: {
          apiDef: variables.apiDef,
          startDate: variables.startDate.getTime(),
          endDate: variables.endDate.getTime(),
        },
        scale: variables.scale,
      }),
  };
};
