import { gql, useMutation } from '@apollo/client';

import { MutationOptions } from '../../../types';

export const UPDATE_USER = gql`
  mutation updateUser($id: ID!, $data: UpdateUserInput!) {
    updateUser(id: $id, data: $data) {
      _id
    }
  }
`;

export const useUpdateUser = (options: MutationOptions = {}) =>
  useMutation(UPDATE_USER, options);
