import { useSources } from '../../model/DataSources/queries';

export const useDataSources = () => {
  const { data, loading } = useSources();

  return {
    connected: data,
    loading,
  };
}
