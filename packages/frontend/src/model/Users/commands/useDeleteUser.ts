import { gql, useMutation } from '@apollo/client';

import { MutationOptions } from '../../../types';

export const DELETE_USER = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id)
  }
`;

export const useDeleteUser = (options: MutationOptions = {}) =>
  useMutation(DELETE_USER, options);
