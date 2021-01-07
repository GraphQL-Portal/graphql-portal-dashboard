import { useQuery, gql } from '@apollo/client';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

export const QUERY_GATEWAYS = gql`
  {
    getGateways {
      nodeId
      lastPingAt
      configTimestamp
      hostname
      status
    }
  }
`;

type Gateway = {
  nodeId: string;
  configTimestamp: number;
  lastPingAt: number;
  hostname: string;
  status: string;
};

const createNodeList = (data: Gateway[]) => {
  if (!data) return [];

  return data
    .slice()
    .sort((a, b) => b.lastPingAt - a.lastPingAt)
    .reduce((acc: any[], gateway: Gateway, idx: number) => {
      const lastPingFormatted = formatDistanceToNow(gateway.lastPingAt, { addSuffix: true });
      // We can mutate acc because we have new [] each time we call this function
      acc[idx] = [gateway.nodeId, gateway.hostname, gateway.status, lastPingFormatted, gateway.configTimestamp];
      return acc;
    }, []);
};

export const useGateways = () => {
  // random interval between 5 and 20 secs
  const randomPollInterval = (Math.floor(Math.random() * 16) + 5) * 1000;
  const { data, loading, error } = useQuery(QUERY_GATEWAYS, {
    pollInterval: randomPollInterval,
  });

  const { getGateways = [] } = data || {};

  return {
    data: createNodeList(getGateways),
    loading,
    error,
  };
};
