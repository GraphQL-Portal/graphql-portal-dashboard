import { useQuery, gql } from '@apollo/client';
import { ApiMetric, QueryHook } from '../../../types';

export const QUERY_API_ACTIVITY = gql`
  query getApiActivity($filters: MetricAggregateFilters!) {
    getApiActivity(filters: $filters) {
      count
      failed
      success
      apiDef
      apiName
      lastAccess
    }
  }
`;

export const useApiActivityQuery: QueryHook<ApiMetric[]> = (options = {}) => {
  const { data, loading, error, refetch } = useQuery(
    QUERY_API_ACTIVITY,
    options
  );

  return {
    data: data?.getApiActivity || [],
    loading,
    error,
    refetch,
  };
};
