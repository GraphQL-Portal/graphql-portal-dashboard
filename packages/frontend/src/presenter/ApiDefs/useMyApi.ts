import { generatePath, useHistory } from 'react-router-dom';

import { ApiDef, UseMyAPIHook } from '../../types';
import { useApiDefs } from '../../model/ApiDefs/queries';
import { useDeleteApiDef } from '../../model/ApiDefs/commands';
import { ROUTES, useDialogs } from '../../model/providers';
import { DELETE_API } from '../../view/Dialogs';
import { createApiDefList } from './helpers';

export const useMyApi: UseMyAPIHook = () => {
  const { push } = useHistory();
  const { data, loading, refetch } = useApiDefs();
  const [deleteApiDef] = useDeleteApiDef();
  const { onOpenDialog, onCloseDialog } = useDialogs()!;

  const onDelete = ({ _id: id, name }: ApiDef) => () =>
    onOpenDialog(DELETE_API, {
      onSuccess: () => {
        deleteApiDef({ variables: { id } });
        onCloseDialog();
      },
      onCancel: onCloseDialog,
      name,
    });

  const onUpdate = ({ _id: id }: ApiDef) => () =>
    push(generatePath(ROUTES.API_EDIT, { id }));

  const onView = ({ _id: id }: ApiDef) => () =>
    push(generatePath(ROUTES.API_VIEW, { id }));

  const onCreate = () => push(ROUTES.API_CREATE);

  return {
    data: createApiDefList(data),
    loading,
    refetch,
    onDelete,
    onUpdate,
    onCreate,
    onView,
  };
};
