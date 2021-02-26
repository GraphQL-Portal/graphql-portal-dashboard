import { useQuery, gql } from '@apollo/client';
import { Gateway, QueryHook } from '../../../types';

export const QUERY_GATEWAYS = gql`
  {
    getGateways {
      nodeId
      lastPingAt
      configTimestamp
      hostname
      status
      listenHostname
      listenPort
      servername
    }
  }
`;

export const useGateways: QueryHook<Gateway[]> = (options = {}) => {
  const { data, loading, error } = useQuery(QUERY_GATEWAYS, options);

  return {
    data: data?.getGateways || [],
    loading,
    error,
  };
};
