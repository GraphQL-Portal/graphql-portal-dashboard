import { UseViewAPIHook } from '../../types';
import { useApiById } from './useApiById';
import { ApiDefStatus } from '@graphql-portal/types';
import { createGraphiQLFetcher } from '@graphiql/toolkit';

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
    ? createGraphiQLFetcher({
        url: apiEndpoint,
        subscriptionUrl: apiEndpoint.replace('http', 'ws'),
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
