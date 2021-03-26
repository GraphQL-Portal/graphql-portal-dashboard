import { useQuery, gql } from '@apollo/client';
import { APIMetricsRefetch } from '../../../types';

export const QUERY_METRICS = gql`
  query getChunkedAPIMetrics($chunks: [String], $filters: MetricFilter!) {
    getChunkedAPIMetrics(chunks: $chunks, filters: $filters) {
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

export const useMetricsQuery = (apiDef: string | undefined, chunks: Date[]) => {
  const { data, loading, error, refetch } = useQuery(QUERY_METRICS, {
    variables: {
      chunks,
      filters: {
        apiDef,
      },
    },
  });

  return {
    data: data?.getUserMetrics,
    loading,
    error,
    refetch: (variables: APIMetricsRefetch) =>
      refetch({
        filters: {
          apiDef,
        },
        chunks: variables.chunks,
      }),
  };
};
