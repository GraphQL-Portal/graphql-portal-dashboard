import { generatePath, useHistory } from 'react-router-dom';

import { ApiDef } from '../../types';
import { useApiDefs } from '../../model/ApiDefs/queries';
import { useDeleteApiDef } from '../../model/ApiDefs/commands';
import { ROUTES, useDialogs } from '../../model/providers';
import { DELETE_API } from '../../view/Dialogs';
import { createApiDefList } from './helpers';

export const useMyApi = () => {
  const { push } = useHistory();
  const { data, loading } = useApiDefs();
  const [deleteApiDef] = useDeleteApiDef();
  const { onOpenDialog, onCloseDialog } = useDialogs()!;

  const onDelete = ({ _id: id, name }: ApiDef) => () => {
    console.log('ON DELETE', id);
    onOpenDialog(DELETE_API, {
      onSuccess: () => {
        deleteApiDef({ variables: { id } });
        onCloseDialog();
      },
      onCancel: onCloseDialog,
      name,
    });
  };

  const onUpdate = ({ _id: id }: ApiDef) => () =>
    push(generatePath(ROUTES.API_EDIT, { id }));

  const onCreate = () => push(ROUTES.API_CREATE);

  return {
    data: createApiDefList(data),
    loading,
    onDelete,
    onUpdate,
    onCreate,
  };
};
