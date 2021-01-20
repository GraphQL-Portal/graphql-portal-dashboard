import { useLazyQuery, useQuery,  gql } from '@apollo/client';

const GET_API_DEFS = gql`
  {
    getApiDefs {
      timestamp
    }
  }
`;

const SYNC_CONFIGURATION = gql`
  {
    publishApiDefsUpdated
  }
`;

export const useSyncConfiguration = () => {
  const { data, refetch } = useQuery(GET_API_DEFS);
  const [onSyncConfiguration] = useLazyQuery(SYNC_CONFIGURATION, {
    onCompleted: refetch,
    fetchPolicy: 'network-only',
  });

  return {
    onSyncConfiguration,
    syncData: data,
  };
};
