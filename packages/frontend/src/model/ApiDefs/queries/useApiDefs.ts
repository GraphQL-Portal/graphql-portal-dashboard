import { useQuery } from '@apollo/client';
import { QUERY_API_DEFS } from '../../../commands';

export const useApiDefs = () => {
  const { data, loading, error } = useQuery(QUERY_API_DEFS);

  return {
    data: data?.getApiDefs?.apiDefs || [],
    loading,
    error,
  };
}
