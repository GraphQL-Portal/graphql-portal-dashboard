import { useQuery, gql } from '@apollo/client';

export const DATA_SOURCES = gql`
  {
    getSources {
      _id
      name
      handler
      transforms
    }
  }
`;

export const useSources = () => {
  const { data, loading, error, refetch } = useQuery(DATA_SOURCES);

  const { getSources = [] } = data || {};

  return { data: getSources, loading, error, refetch };
}
