import { gql, useMutation } from '@apollo/client';

export const DELETE_USER = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id)
  }
`;

export const useDeleteUser = (options: any = {}) =>
  useMutation(DELETE_USER, options);
