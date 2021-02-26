import { UseViewAPIHook } from '../../types';
import { useGateways } from '../../model/GatewayNodes/queries';
import { useApiById } from './useApiById';
import { getUrlFromGatewayNodes, createFetcher } from './helpers';

export const useViewAPI: UseViewAPIHook = () => {
  const { data, loading, tab, onChange } = useApiById();
  const { data: gatewayData, loading: gatewayLoading } = useGateways();

  const viewLoading = loading || gatewayLoading;

  const fetcher = !viewLoading
    ? createFetcher(getUrlFromGatewayNodes(gatewayData, data?.endpoint), {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      })
    : (body: any) => Promise.resolve(body);

  return {
    tab,
    onChange,
    fetcher,
    data,
    loading: viewLoading,
  };
};
