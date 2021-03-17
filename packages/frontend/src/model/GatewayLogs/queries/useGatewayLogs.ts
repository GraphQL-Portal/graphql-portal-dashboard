import { useQuery, gql } from '@apollo/client';

export const QUERY_LOGS = gql`
  {
    getLatestLogs {
      nodeId
      hostname
      prefix
      message
      level
      timestamp
    }
  }
`;

export const useGatewayLogs = (options = {}) => {
  const { data, loading, error, subscribeToMore } = useQuery(
    QUERY_LOGS,
    options
  );

  return {
    data: data?.getLatestLogs || [],
    loading,
    error,
    subscribeToMore,
  };
};
