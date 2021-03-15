import { useQuery, gql } from '@apollo/client';
import { QueryHook, ApiDef } from '../../../types';

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
      schema_polling_interval
      schema_updates_through_control_api
      enable_ip_filtering
      request_size_limit
      depth_limit
      request_complexity_limit
      rate_limit {
        complexity
        per
      }
      enable_ip_filtering
      allow_ips
      deny_ips
      mesh
    }
  }
`;

export const useApiDefById: QueryHook<ApiDef> = (options = {}) => {
  const { data, loading, error, refetch } = useQuery(
    GET_API_DEF_BY_ID,
    options
  );

  return {
    data: data?.getApiDefById || {},
    loading,
    error,
    refetch,
  };
};
