import { useQuery, gql} from '@apollo/client';

import { GATEWAYS_UPDATE } from '../subscriptions';

export const QUERY_GATEWAYS = gql`
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
    // We can mutate acc because we have new [] each time we call this function
    acc[idx] = [gateway.nodeId, 'active', gateway.lastPingAt, gateway.configTimestamp];
    return acc;
  }, []);
};

export const useGateways = () => {
  const { data, loading, error, subscribeToMore } = useQuery(QUERY_GATEWAYS);

  subscribeToMore({
    document: GATEWAYS_UPDATE,
    updateQuery: (_, { subscriptionData }) => {
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
