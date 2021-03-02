import { useHistory } from 'react-router-dom';

import {
  useDialogs,
  ROUTES,
  useDataSourceContext,
  useToast,
} from '../../model/providers';
import { useSources } from '../../model/DataSources/queries';
import { useDeleteSource } from '../../model/DataSources/commands';
import { DELETE_DATA_SOURCE } from '../../view/Dialogs';
import { DataSource, AError } from '../../types';
import { AVAILABLE_HANDLERS } from './constants';
import { getHandlerKey, createDataSourceList } from './helpers';

export const useDataSources = () => {
  const { showErrorToast } = useToast();
  const { data, loading, refetch } = useSources({
    fetchPolicy: 'network-only',
  });
  const { setSource } = useDataSourceContext();
  const { push } = useHistory();
  const { onOpenDialog, onCloseDialog } = useDialogs()!;
  const { deleteSource } = useDeleteSource({
    onCompleted: refetch,
    onError({ message }: AError) {
      showErrorToast(message);
    },
  });

  const connected = createDataSourceList(data || []);

  const onDelete = (idx: number) => () => {
    const { _id: id, name } = connected[idx];
    onOpenDialog(DELETE_DATA_SOURCE, {
      onSuccess: () => {
        deleteSource({ variables: { id } });
        onCloseDialog();
      },
      onCancel: onCloseDialog,
      name,
    });
  };

  const onUpdate = ({ handler, name, transforms, _id }: DataSource) => () => {
    const key = getHandlerKey(handler);

    setSource({
      key,
      connector: AVAILABLE_HANDLERS[key],
      state: { handler, name, transforms, _id },
    });
    push(ROUTES.DATA_SOURCE_EDIT);
  };

  return {
    connected,
    loading,
    onDelete,
    onUpdate,
  };
};
