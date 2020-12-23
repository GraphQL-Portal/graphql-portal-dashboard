import { useEffect } from 'react';
import { useGateways, useSyncConfiguration } from '../../model/GatewayNodes/queries';

export const useGatewayNodes = () => {
  const { refetch, onSyncConfiguration, syncData } = useSyncConfiguration();
  const { loading, data } = useGateways();

  useEffect(() => { onSyncConfiguration() }, [onSyncConfiguration]);

  // to prevent TS complaining on React onClick types signature
  const onSyncClick = () => refetch!();

  const {
    getApiDefs: { timestamp = 0 },
  } = syncData || { getApiDefs: {} };

  return { loading, data, onSyncClick, timestamp };
}
