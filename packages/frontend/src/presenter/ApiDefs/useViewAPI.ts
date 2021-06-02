import { UseViewAPIHook } from '../../types';
import { useApiById } from './useApiById';
import { createFetcher } from './helpers';
import { ApiDefStatus } from '@graphql-portal/types';

export const useViewAPI: UseViewAPIHook = () => {
  const {
    api,
    loading,
    tab,
    onChange,
    apiEndpoint,
    apiHealthCheckFailed,
    refetch,
  } = useApiById();

  const fetcher = !loading
    ? createFetcher(apiEndpoint, {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      })
    : (body: any) => Promise.resolve(body);

  const {
    name = '',
    enabled = false,
    status = ApiDefStatus.INITIALIZED,
  } = api || {};

  return {
    tab,
    onChange,
    fetcher,
    name,
    enabled,
    loading,
    status,
    refetch,
    apiEndpoint,
    apiHealthCheckFailed,
  };
};
