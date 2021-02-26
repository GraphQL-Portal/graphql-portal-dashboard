import {
  useGateways,
  useSyncConfiguration,
} from '../../model/GatewayNodes/queries';
import { createNodeList } from './helpers';

export const useGatewayNodes = () => {
  const { onSyncConfiguration, syncData } = useSyncConfiguration();
  const { loading, data } = useGateways({
    pollInterval: 10000,
  });

  // to prevent TS complaining on React onClick types signature
  const onSyncClick = () => onSyncConfiguration();

  const {
    getApiDefs: { timestamp = 0 },
  } = syncData || { getApiDefs: {} };

  return {
    loading,
    data: createNodeList(data),
    onSyncClick,
    timestamp,
  };
};
