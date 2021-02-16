import { useQuery, gql } from '@apollo/client';
import { QueryOptions } from '../../../types';

const GET_API_DEF_BY_ID = gql`
  query getApiDefById($id: String!) {
    getApiDefById(id: $id) {
      _id
      name
      enabled
      playground
      endpoint
      sources {
        _id
        name
        updatedAt
      }
      createdAt
      updatedAt
      authentication {
        auth_header_name
        auth_tokens
      }
    }
  }
`;

export const useApiDefById = (options: QueryOptions = {}) => {
  const { data, loading, error } = useQuery(GET_API_DEF_BY_ID, options);

  return {
    data: data?.getApiDefById || {},
    loading,
    error,
  };
};
