import { useQuery, gql } from '@apollo/client';

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

type Source = {
  _id: string;
  name: string;
  updatedAt?: string;
  handler: any;
  transforms: any;
};

const preprocessSources = (data: Source[]) => {
  if (!data) return [];

  return data.slice().sort((one, two) => (one.name > two.name ? -1 : 1));
};

export const useSources = (options?: any) => {
  const { data, loading, error, refetch } = useQuery(
    DATA_SOURCES,
    options || {}
  );

  const { getSources = [] } = data || {};

  return { data: preprocessSources(getSources), loading, error, refetch };
};
