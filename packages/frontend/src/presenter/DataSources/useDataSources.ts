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
import { sortSourcesByName } from './helpers';

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

  const onUpdate = ({ handler, name, transforms, _id }: DataSource) => () => {
    const key = Object.keys(handler)[0];
    setSource({
      key,
      connector: AVAILABLE_HANDLERS[key],
      state: { handler, name, transforms, _id },
    });
    push(ROUTES.DATA_SOURCE_EDIT);
  };

  return {
    connected: sortSourcesByName(data),
    loading,
    onDelete,
    onUpdate,
  };
};
