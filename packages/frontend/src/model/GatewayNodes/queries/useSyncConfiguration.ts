import { useLazyQuery, gql } from '@apollo/client';

/**
 * @TODO send request to update configuration status
 */

const SYNC_CONFIGURATION = gql`
  query hello($name: String!) {
    hello(name: $name)
  }
`;

export const useSyncConfiguration = () => {
  const [onSyncConfiguration, { loading, data, error, refetch }] = useLazyQuery(SYNC_CONFIGURATION,
    {
      variables: {
        name: 'Configuration'
      },
    },
  );

  return {
    onSyncConfiguration,
    loading,
    data,
    error,
    refetch,
  };
};
