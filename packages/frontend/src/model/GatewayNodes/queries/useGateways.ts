import { useQuery, gql } from '@apollo/client';

import { GATEWAYS_UPDATE } from '../subscriptions';

const QUERY_GATEWAYS = gql`
  {
    getGateways {
      nodeId
      lastPingAt
      configTimestamp
    }
  }
`;

type Gateway = {
  nodeId: string;
  configTimestamp: number;
  lastPingAt: number;
};

const createNodeList = (data: Gateway[]) => {
  if (!data) return [];

  return data.reduce((acc: any[], gateway: Gateway, idx: number) => {
    acc[idx] = [gateway.nodeId, 'active', gateway.lastPingAt, gateway.configTimestamp];
    return acc;
  }, []);
};

export const useGateways = () => {
  const { data, loading, error, subscribeToMore } = useQuery(QUERY_GATEWAYS);

  subscribeToMore({
    document: GATEWAYS_UPDATE,
    updateQuery: (prev, { subscriptionData }) => {
      return { getGateways: createNodeList(subscriptionData.data.gatewaysUpdated) };
    },
  });

  const { getGateways = [] } = data || {};

  return {
    data: createNodeList(getGateways),
    loading,
    error,
  };
};
