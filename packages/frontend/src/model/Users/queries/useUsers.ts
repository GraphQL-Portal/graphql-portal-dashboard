import { gql, useQuery } from '@apollo/client';

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

export const useUsersQuery = (options: any = {}) => {
  const { data, loading, error, refetch } = useQuery(QUERY_USERS);

  return {
    data: data?.getUsers || [],
    loading,
    error,
    refetch,
    // onBlock: (id: string) => onBlockUser({ variables: { id } }),
    // onUnblock: (id: string) => onUnblockUser({ variables: { id } }),
    // onEdit: (data: any) => {
    //   console.log('onEditData', data);
    //   onOpenDialog(UPDATE_USER, {
    //     onSuccess: (updatedData: any) => {
    //       console.log('updatedData', updatedData);
    //       onCloseDialog();
    //     },
    //     onCancel: onCloseDialog,
    //     data,
    //   });
    // },
    // onDelete: (id: string, email: string) => {
    //   onOpenDialog(DELETE_USER, {
    //     onSuccess: () => {
    //       onDeleteUser({ variables: { id } });
    //       onCloseDialog();
    //     },
    //     onCancel: onCloseDialog,
    //     id,
    //     email,
    //   });
    // },
  };
};
