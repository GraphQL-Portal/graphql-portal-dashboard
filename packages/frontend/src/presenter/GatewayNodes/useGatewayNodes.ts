
import { useEffect } from 'react';
import { useSyncConfiguration } from '../../model/GatewayNodes/queries';

export const useGatewayNodes = () => {
  const { loading, data, error, onSyncConfiguration, refetch } = useSyncConfiguration();
  useEffect(() => {
    onSyncConfiguration();
  }, [onSyncConfiguration]);

  // to prevent TS complaining on React onClick types signature
  const onSyncClick = () => refetch!();

  return { loading, data, error, onSyncClick };
}
