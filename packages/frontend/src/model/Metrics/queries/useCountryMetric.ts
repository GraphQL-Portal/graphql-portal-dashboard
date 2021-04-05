import { useQuery, gql } from '@apollo/client';
import { CountryMetric, QueryHook } from '../../../types';

const COUNTRY_METRIC = gql`
  query getCountryMetrics(
    $startDate: Timestamp!
    $endDate: Timestamp!
    $filters: MetricFilter!
    $limit: Int
  ) {
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

export const useCountryMetric: QueryHook<CountryMetric[]> = (options = {}) => {
  const { data, loading, error, refetch } = useQuery(COUNTRY_METRIC, options);

  return {
    data: data?.getCountryMetrics || [],
    loading,
    error,
    refetch,
  };
};
