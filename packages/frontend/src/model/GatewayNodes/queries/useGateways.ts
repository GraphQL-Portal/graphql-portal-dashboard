import { useQuery, gql } from '@apollo/client';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { Gateway, GatewayNode } from '../../../types';

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

/*
 * @TODO
 * 1. move this function to presenter/GatewayNodes
 * 2. GatewayNode [] -> {}
 * 3. Modify GatewayNode view for new data
 */
const createNodeList = (data: Gateway[]): GatewayNode[] => {
  if (!data) return [];

  return data
    .slice()
    .sort((a, b) => b.lastPingAt - a.lastPingAt)
    .reduce((acc: any[], gateway: Gateway, idx: number) => {
      // We can mutate acc because we have new [] each time we call this function
      acc[idx] = [
        gateway.nodeId,
        gateway.hostname,
        gateway.status,
        formatDistanceToNow(gateway.lastPingAt, { addSuffix: true }),
        gateway.configTimestamp,
      ];
      return acc;
    }, []);
};

export const useGateways = () => {
  // random interval between 5 and 20 secs
  // const randomPollInterval = (Math.floor(Math.random() * 16) + 5) * 1000;
  const { data, loading, error } = useQuery(QUERY_GATEWAYS, {
    pollInterval: 10000,
  });

  const { getGateways = [] } = data || {};

  return {
    data: createNodeList(getGateways),
    loading,
    error,
  };
};
