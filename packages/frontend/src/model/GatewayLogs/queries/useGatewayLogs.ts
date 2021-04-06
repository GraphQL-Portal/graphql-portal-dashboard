import { useQuery, gql } from '@apollo/client';
import { Log, QueryHook } from '../../../types';

export const QUERY_LOGS = gql`
  query getLatestLogs($latestTimestamp: String) {
    getLatestLogs(latestTimestamp: $latestTimestamp) {
      nodeId
      hostname
      prefix
      message
      level
      timestamp
    }
  }
`;

export const useGatewayLogs: QueryHook<Log[]> = (options) => {
  const { data, loading, error } = useQuery(QUERY_LOGS, options);

  return {
    data: data?.getLatestLogs || [],
    loading,
    error,
  };
};
