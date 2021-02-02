import { useBlockUser, useUnblockUser, useDeleteUser, useCreateUser } from '../commands';
import { gql, useQuery } from '@apollo/client';
import { useDialogs, useToast } from '../../providers';
import { DELETE_USER, UPDATE_USER, CREATE_USER } from '../../../view/Dialogs';

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
  const { showErrorToast, showSuccessToast } = useToast();
  const options = { onCompleted: refetch, onError: (error: Error) => showErrorToast(error.message) };
  const [onBlockUser] = useBlockUser(options);
  const [onUnblockUser] = useUnblockUser(options);
  const [onDeleteUser] = useDeleteUser(options);
  const [onCreateUser] = useCreateUser(options);
  const { onOpenDialog: onOpenDeleteDialog, onCloseDialog: onCloseDeleteDialog } = useDialogs()!;
  const { onOpenDialog: onOpenEditDialog, onCloseDialog: onCloseEditDialog } = useDialogs()!;
  const { onOpenDialog: onOpenCreateDialog, onCloseDialog: onCloseCreateDialog } = useDialogs()!;

  return {
    data: data?.getUsers || [],
    loading,
    error,
    onBlock: (id: string) => onBlockUser({ variables: { id } }),
    onUnblock: (id: string) => onUnblockUser({ variables: { id } }),
    onCreate: () => {
      onOpenCreateDialog(CREATE_USER, {
        onSuccess: (createData: any) => {
          onCreateUser({ variables: { data: createData } });
          onCloseCreateDialog();
          showSuccessToast('Successfully created. User has to confirm email address.')
        },
        onCancel: onCloseCreateDialog,
      })
    },
    onEdit: (editData: any) => {
      onOpenEditDialog(UPDATE_USER, {
        onSuccess: (updatedData: any) => {
          onCloseEditDialog();
        },
        onCancel: onCloseEditDialog,
        data: editData,
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
