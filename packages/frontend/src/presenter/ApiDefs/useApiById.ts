import { useParams } from 'react-router-dom';
import { useApiDefById } from '../../model/ApiDefs/queries';
import { useTabs } from '../../model/Hooks';
import { UseApiByIdHook } from '../../types';
import { getUrlFromGatewayNodes } from './helpers';

export const useApiById: UseApiByIdHook = () => {
  const { id } = useParams<{ id: string }>();
  const { tab, onChange } = useTabs();
  const { loading, data, refetch } = useApiDefById({ variables: { id } });

  const api = data?.getApiDefById || {};
  const { endpoint = '' } = data?.getApiDefById || {};
  const apiEndpoint = getUrlFromGatewayNodes(data.getGateways || [], endpoint);

  return { loading, api, tab, onChange, refetch, apiEndpoint };
};
