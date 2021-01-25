import { useSources } from '../../model/DataSources/queries';
import { useDeleteSource } from '../../model/DataSources/commands';

export const useDataSources = () => {
  const { data, loading, refetch } = useSources();
  const { deleteSource } = useDeleteSource({ onCompleted: refetch });

  const onDelete = (id: string) => () => deleteSource({ variables: { id } });

  return {
    connected: data,
    loading,
    onDelete,
  };
}
