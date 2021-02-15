import { useQuery, gql } from '@apollo/client';

import { QueryOptions } from '../../../types';

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

export const useSources = (options: QueryOptions = {}) => {
  const { data, loading, error, refetch } = useQuery(DATA_SOURCES, options);

  const { getSources = [] } = data || {};

  return { data: getSources, loading, error, refetch };
};
