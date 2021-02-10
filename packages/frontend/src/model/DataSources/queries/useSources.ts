import { useQuery, gql } from '@apollo/client';
import { DataSource } from '../../../types';

export const DATA_SOURCES = gql`
  {
    getSources {
      _id
      name
      handler
      transforms
      updatedAt
    }
  }
`;

const sortSourcesByName = (data: DataSource[]): DataSource[] => {
  if (!data) return [];

  return data.slice().sort((one, two) => (one.name > two.name ? -1 : 1));
};

export const useSources = (options?: any) => {
  const { data, loading, error, refetch } = useQuery(
    DATA_SOURCES,
    options || {}
  );

  const { getSources = [] } = data || {};

  return { data: sortSourcesByName(getSources), loading, error, refetch };
};
