import { useBlockUser, useUnblockUser, useDeleteUser } from '../commands';
import { gql, useQuery } from '@apollo/client';
import { useDialogs } from '../../providers';
import { DELETE_USER, UPDATE_USER } from '../../../view/Dialogs';

export const QUERY_USERS = gql`
  {
    getUsers {
      _id
      firstName
      lastName
      role
      email
      deletedAt
      createdAt
      updatedAt
    }
  }
`;

export const useUsersQuery = () => {
  const { data, loading, error, refetch } = useQuery(QUERY_USERS);
  const [onBlockUser] = useBlockUser({ onCompleted: refetch });
  const [onUnblockUser] = useUnblockUser({ onCompleted: refetch });
  const [onDeleteUser] = useDeleteUser({ onCompleted: refetch });
  const { onOpenDialog: onOpenDeleteDialog, onCloseDialog: onCloseDeleteDialog } = useDialogs()!;
  const { onOpenDialog: onOpenEditDialog, onCloseDialog: onCloseEditDialog } = useDialogs()!;

  return {
    data: data?.getUsers || [],
    loading,
    error,
    onBlock: (id: string) => onBlockUser({ variables: { id } }),
    onUnblock: (id: string) => onUnblockUser({ variables: { id } }),
    onEdit: (data: any) => {
      console.log('onEditData', data);
      onOpenEditDialog(UPDATE_USER, {
        onSuccess: (updatedData: any) => {
          console.log('updatedData', updatedData);
          onCloseEditDialog();
        },
        onCancel: onCloseEditDialog,
        data,
      })
    },
    onDelete: (id: string, email: string) => {
      onOpenDeleteDialog(DELETE_USER, {
        onSuccess: () => {
          onDeleteUser({ variables: { id } });
          onCloseDeleteDialog();
        },
        onCancel: onCloseDeleteDialog,
        id,
        email,
      });
    },
  };
}
