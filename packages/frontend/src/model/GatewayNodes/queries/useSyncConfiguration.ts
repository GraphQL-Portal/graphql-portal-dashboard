import { useLazyQuery, gql } from '@apollo/client';

const SYNC_CONFIGURATION = gql`
  {
    publishApiDefsUpdated
    getApiDefs {
      timestamp
    }
  }
`;

export const useSyncConfiguration = () => {
  const [onSyncConfiguration, { data, refetch }] = useLazyQuery(SYNC_CONFIGURATION);

  return {
    onSyncConfiguration,
    syncData: data,
    refetch,
  };
};
