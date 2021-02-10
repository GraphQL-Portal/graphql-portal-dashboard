import { useQuery, gql } from '@apollo/client';

export const QUERY_API_DEFS = gql`
  {
    getApiDefs {
      apiDefs {
        _id
        name
        createdAt
        updatedAt
      }
      timestamp
    }
  }
`;

export const useApiDefs = () => {
  const { data, loading, error } = useQuery(QUERY_API_DEFS);

  return {
    data: data?.getApiDefs?.apiDefs || [],
    loading,
    error,
  };
};
