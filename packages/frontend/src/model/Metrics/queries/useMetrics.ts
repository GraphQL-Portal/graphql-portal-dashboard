import { useQuery, gql } from '@apollo/client';
import { MetricsRefetch, Scale } from '../../../types';

export const QUERY_METRICS = gql`
  query getUserMetrics($scale: String, $filters: MetricFilters!) {
    getUserMetrics(scale: $scale, filters: $filters) {
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
  apiDef: string | undefined,
  startDate: Date,
  endDate: Date,
  scale: Scale
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
    data: data?.getUserMetrics,
    loading,
    error,
    refetch: (variables: MetricsRefetch) =>
      refetch({
        filters: {
          apiDef,
          startDate: variables.startDate.getTime(),
          endDate: variables.endDate.getTime(),
        },
        scale: variables.scale,
      }),
  };
};
