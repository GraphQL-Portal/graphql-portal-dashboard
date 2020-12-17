
import { useEffect } from 'react';
import { useSyncConfiguration } from '../../model/GatewayNodes/queries';

export const useGatewayNodes = () => {
  const { loading, data, error, onSyncConfiguration, refetch } = useSyncConfiguration();
  useEffect(() => {  onSyncConfiguration() }, []);

  // to prevent TS complaining on event
  const onSyncClick = () => refetch!();

  return { loading, data, error, onSyncClick };
}
