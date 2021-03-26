import { UseViewAPIHook } from '../../types';
import { useApiById } from './useApiById';
import { createFetcher } from './helpers';

export const useViewAPI: UseViewAPIHook = () => {
  const { api, loading, tab, onChange, apiEndpoint } = useApiById();

  const fetcher = !loading
    ? createFetcher(apiEndpoint, {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      })
    : (body: any) => Promise.resolve(body);

  const { name = '', enabled = false } = api || {};

  return {
    tab,
    onChange,
    fetcher,
    name,
    enabled,
    loading,
    apiEndpoint,
  };
};
