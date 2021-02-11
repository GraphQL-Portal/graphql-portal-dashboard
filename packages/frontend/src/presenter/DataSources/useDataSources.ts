import { useHistory } from 'react-router-dom';
import {
  useDialogs,
  ROUTES,
  useDataSourceContext,
} from '../../model/providers';
import { useSources } from '../../model/DataSources/queries';
import { useDeleteSource } from '../../model/DataSources/commands';
import { DELETE_DATA_SOURCE } from '../../view/Dialogs';
import { AVAILABLE_DATA_SOURCES } from './constants';

export const useDataSources = () => {
  const { data, loading, refetch } = useSources({
    fetchPolicy: 'network-only',
  });
  const { setSource } = useDataSourceContext();
  const { push } = useHistory();
  const { onOpenDialog, onCloseDialog } = useDialogs()!;
  const { deleteSource } = useDeleteSource({ onCompleted: refetch });

  const onDelete = (idx: number) => () => {
    const { _id: id, name } = data[idx];
    onOpenDialog(DELETE_DATA_SOURCE, {
      onSuccess: () => {
        deleteSource({ variables: { id } });
        onCloseDialog();
      },
      onCancel: onCloseDialog,
      name,
    });
  };

  const onUpdate = (idx: number) => () => {
    const { handler, name, transforms, _id: id } = data[idx];

    const key = Object.keys(handler)[0];
    setSource({
      key,
      connector: AVAILABLE_DATA_SOURCES[key],
      state: { handler, name, transforms, id },
    });
    push(ROUTES.DATA_SOURCE_EDIT);
  };

  return {
    connected: data,
    loading,
    onDelete,
    onUpdate,
  };
};
