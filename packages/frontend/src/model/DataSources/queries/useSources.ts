import { useQuery, gql } from '@apollo/client';

const DATA_SOURCES = gql`{
  getSources {
    name
    handler
    transforms
  }
}`;

export const useSources = () => {
  const { data, loading, error } = useQuery(DATA_SOURCES);

  const { getSources = [] } = data || {};

  return { data: getSources, loading, error };
}
