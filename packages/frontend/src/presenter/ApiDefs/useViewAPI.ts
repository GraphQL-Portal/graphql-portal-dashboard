import fetch from 'isomorphic-fetch';
import { useAuth } from '../../model/providers';
import { URI } from '../../model/providers/State/config';
import { UseViewAPIHook } from '../../types';
import { useApiById } from './useApiById';

const createFetcher = (uri: string, headers: Record<string, any> = {}) => (
  body: any
) =>
  fetch(uri, {
    method: 'POST',
    body: JSON.stringify(body),
    headers,
  }).then((response) => response.json().catch(() => response.text()));

/** @TODO
 * 1. we need to pass into fetcher uri to our api graphql endpoint
 * 2. pass auth headers from api to fetcher
 */
export const useViewAPI: UseViewAPIHook = () => {
  const { data, loading, tab, onChange } = useApiById();
  const { accessToken } = useAuth();

  const fetcher = createFetcher(URI, {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    authorization: accessToken,
  });

  return {
    tab,
    onChange,
    fetcher,
    data,
    loading,
  };
};
