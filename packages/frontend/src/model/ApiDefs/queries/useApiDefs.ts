import { useQuery, gql } from '@apollo/client';

import { QueryHook, ApiDef, GetApiDefsData } from '../../../types';

export const QUERY_API_DEFS = gql`
  {
    getApiDefs {
      apiDefs {
        _id
        name
        createdAt
        updatedAt
        enabled
        endpoint
        sources {
          _id
        }
      }
      timestamp
    }
  }
`;

export const useApiDefs: QueryHook<ApiDef[]> = (options = {}) => {
  const { data, loading, error, refetch } = useQuery<GetApiDefsData>(
    QUERY_API_DEFS,
    options
  );

  return {
    data: data?.getApiDefs?.apiDefs || [],
    loading,
    error,
    refetch,
  };
};
