import { useUsersQuery } from '../../model/Users/queries';
import {
  useBlockUser,
  useUnblockUser,
  useDeleteUser,
} from '../../model/Users/commands';
import { useDialogs } from '../../model/providers';
import { DELETE_USER, UPDATE_USER } from '../../view/Dialogs';

import { createUsersList } from './helpers';

export const useUsers = () => {
  const { data, loading, refetch } = useUsersQuery();
  const onCompleted = refetch;
  const [onBlockUser] = useBlockUser({ onCompleted });
  const [onUnblockUser] = useUnblockUser({ onCompleted });
  const [onDeleteUser] = useDeleteUser({ onCompleted });
  const { onOpenDialog, onCloseDialog } = useDialogs()!;

  const list = createUsersList(data);
  console.log('USERS IS: ', list);
  console.log('LIST IS: ', createUsersList(data));

  const onEdit = (idx: number) => () => {
    onOpenDialog(UPDATE_USER, {
      onSuccess(updatedData: any) {
        console.log('NEW USER DATA: ', updatedData);
        onCloseDialog();
      },
      onCancel: onCloseDialog,
      user: list[idx],
    });
  };
  const onBlock = (idx: number) => () => console.log('onBlock: ', idx);
  const onUnblock = (idx: number) => () => console.log('onUnblock: ', idx);
  const onDelete = (idx: number) => () => console.log('onDelete: ', idx);

  return {
    list,
    loading,
    // onEdit: (index: number) => onEdit(data[index]),
    // onBlock: (index: number) => onBlock(data[index]?._id),
    // onUnblock: (index: number) => onUnblock(data[index]?._id),
    // onDelete: (index: number) => onDelete(data[index]?._id, data[index]?.email)
    onEdit,
    onBlock,
    onUnblock,
    onDelete,
  };
};
