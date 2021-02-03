import { useUsersQuery } from '../../model/Users/queries';
import {
  useBlockUser,
  useUnblockUser,
  useDeleteUser,
  useCreateUser,
  useUpdateUser,
} from '../../model/Users/commands';
import { useDialogs, useToast } from '../../model/providers';
import { CREATE_USER, DELETE_USER, UPDATE_USER } from '../../view/Dialogs';

import { createUsersList } from './helpers';

export const useUsers = () => {
  const { showErrorToast, showSuccessToast } = useToast();
  const { data, refetch, loading } = useUsersQuery();

  const getOptions = (success: string) => {
    return {
      onCompleted: async () => {
        showSuccessToast(success);
        await refetch();
      },
      onError: async (error: Error) => {
        showErrorToast(error.message);
        await refetch();
      }
    }
  }
  const [onBlockUser] = useBlockUser(getOptions('Successfully blocked.'));
  const [onUnblockUser] = useUnblockUser(getOptions('Successfully unblocked.'));
  const [onDeleteUser] = useDeleteUser(getOptions('Successfully deleted.'));
  const [onUpdateUser] = useUpdateUser(getOptions('Successfully updated.'));
  const [onCreateUser] = useCreateUser(getOptions('Successfully created. User has to confirm email address.'));

  const { onOpenDialog: onOpenDeleteDialog, onCloseDialog: onCloseDeleteDialog } = useDialogs()!;
  const { onOpenDialog: onOpenEditDialog, onCloseDialog: onCloseEditDialog } = useDialogs()!;
  const { onOpenDialog: onOpenCreateDialog, onCloseDialog: onCloseCreateDialog } = useDialogs()!;

  const list = createUsersList(data);

  const getUserId = (index: number) => data[index]?._id;
  const onBlock = (index: number) => onBlockUser({ variables: { id: getUserId(index) } });
  const onUnblock = (index: number) => onUnblockUser({ variables: { id: getUserId(index) } });
  const onDelete = (index: number) => {
    onOpenDeleteDialog(DELETE_USER, {
      onSuccess: () => {
        onDeleteUser({ variables: { id: getUserId(index) } });
        onCloseDeleteDialog();
      },
      onCancel: onCloseDeleteDialog,
      email: data[index]?.email,
    });
  };
  const onCreate = () => {
    onOpenCreateDialog(CREATE_USER, {
      onSuccess: (createData: any) => {
        onCreateUser({ variables: { data: createData } });
        onCloseCreateDialog();
      },
      onCancel: onCloseCreateDialog,
    })
  };
  const onEdit = (index: number) => {
    onOpenEditDialog(UPDATE_USER, {
      onSuccess: (updatedData: any) => {
        onUpdateUser({
          variables: {
            data: {
              firstName: updatedData.firstName,
              lastName: updatedData.lastName,
              role: updatedData.role,
            },
            id: getUserId(index),
          }
        });
        onCloseEditDialog();
      },
      onCancel: onCloseEditDialog,
      user: data[index],
    })
  };

  return {
    onBlock,
    onUnblock,
    onCreate,
    onEdit,
    onDelete,
    loading,
    list,
  };
};
