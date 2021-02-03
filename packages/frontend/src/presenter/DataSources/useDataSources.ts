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

  const onDelete = (id: string, name: string) => () =>
    onOpenDialog(DELETE_DATA_SOURCE, {
      onSuccess: () => {
        deleteSource({ variables: { id } });
        onCloseDialog();
      },
      onCancel: onCloseDialog,
      name,
    });

  const onUpdate = (dataSource: any) => () => {
    const { handler, name, transforms } = dataSource;
    const key = Object.keys(handler)[0];
    // get key from data source
    // form state { name, handler, transforms }
    // set state to context
    setSource({
      key,
      connector: AVAILABLE_DATA_SOURCES[key],
      state: { handler, name, transforms },
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
