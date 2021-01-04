import { useQuery } from '@apollo/client';
import { DATA_SOURCES } from '../../../commands';

export const useSources = () => {
  const { data, loading, error } = useQuery(DATA_SOURCES);

  const { getSources = [] } = data || {};

  return { data: getSources, loading, error };
}
