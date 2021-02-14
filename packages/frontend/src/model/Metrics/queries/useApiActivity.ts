import { useQuery, gql } from '@apollo/client';

export const QUERY_API_ACTIVITY = gql`
  query getApiActivity($filters: MetricFilters!) {
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

export const useApiActivityQuery = (startDate: Date, endDate: Date) => {
  const { data, loading, error } = useQuery(QUERY_API_ACTIVITY, {
    variables: {
      filters: {
        startDate: startDate.getTime(),
        endDate: endDate.getTime(),
      },
    },
  });

  return {
    data: data?.getApiActivity,
    loading,
    error,
  };
};
