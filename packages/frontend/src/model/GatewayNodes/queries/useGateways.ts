import { useQuery } from '@apollo/client';
import { QUERY_GATEWAYS } from '../../../commands';

import { GATEWAYS_UPDATE } from '../subscriptions';


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
