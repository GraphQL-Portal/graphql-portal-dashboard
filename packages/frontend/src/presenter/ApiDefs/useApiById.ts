import { useParams } from 'react-router-dom';

import { useApiDefById } from '../../model/ApiDefs/queries';
import { useTabs } from '../../model/Hooks';
import { UseApiByIdHook } from '../../types';
import { getUrlFromGatewayNodes } from './helpers';
import { useEffect, useState } from 'react';
import { healthCheckApi } from '../../utils';

export const useApiById: UseApiByIdHook = () => {
  const { id } = useParams<{ id: string }>();
  const { tab, onChange } = useTabs();
  const [healthCheckFailed, setHealthCheckFailed] = useState(false);
  const { loading, data, refetch } = useApiDefById({ variables: { id } });

  const api = data?.getApiDefById || {};
  const { endpoint = '' } = data?.getApiDefById || {};
  const apiEndpoint = getUrlFromGatewayNodes(data.getGateways || [], endpoint);

  useEffect(() => {
    healthCheckApi(apiEndpoint).then((result) => setHealthCheckFailed(!result));
  }, [apiEndpoint]);

  const gatewaysDisabled = data.getGateways?.length === 0;
  const apiHealthCheckFailed = gatewaysDisabled || healthCheckFailed;

  return {
    loading,
    api,
    tab,
    onChange,
    refetch,
    apiEndpoint,
    apiHealthCheckFailed,
  };
};
