import { useDialogs } from '../../model/providers';
import { useSources } from '../../model/DataSources/queries';
import { useDeleteSource } from '../../model/DataSources/commands';
import { DELETE_DATA_SOURCE } from '../../view/Dialogs';

export const useDataSources = () => {
  const { data, loading, refetch } = useSources({
    fetchPolicy: 'network-only',
  });

  const { onOpenDialog, onCloseDialog } = useDialogs()!;
  const { deleteSource } = useDeleteSource({ onCompleted: refetch });

  const onDelete = (id: string, name: string) => () =>
    onOpenDialog(DELETE_DATA_SOURCE, {
      onSuccess: () => {
        deleteSource({ variables: { id } });
        onCloseDialog();
      },
      onCancel: onCloseDialog,
      name,
    });

  return {
    connected: data,
    loading,
    onDelete,
  };
};
