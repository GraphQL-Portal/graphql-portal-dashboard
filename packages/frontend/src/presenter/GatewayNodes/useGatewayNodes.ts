import {
  useGateways,
  useSyncConfiguration,
} from '../../model/GatewayNodes/queries';

export const useGatewayNodes = () => {
  const { onSyncConfiguration, syncData } = useSyncConfiguration();
  const { loading, data } = useGateways();

  // to prevent TS complaining on React onClick types signature
  const onSyncClick = () => onSyncConfiguration();

  const {
    getApiDefs: { timestamp = 0 },
  } = syncData || { getApiDefs: {} };

  return { loading, data, onSyncClick, timestamp };
};
