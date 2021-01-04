import { useLazyQuery } from '@apollo/client';
import { SYNC_CONFIGURATION } from '../../../commands';


export const useSyncConfiguration = () => {
  const [onSyncConfiguration, { data, refetch }] = useLazyQuery(SYNC_CONFIGURATION);

  return {
    onSyncConfiguration,
    syncData: data,
    refetch,
  };
};
