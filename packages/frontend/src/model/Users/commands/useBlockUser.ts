import { gql, useMutation } from '@apollo/client';

import { MutationOptions } from '../../../types';

export const BLOCK_USER = gql`
  mutation blockUser($id: ID!) {
    blockUser(id: $id) {
      _id
    }
  }
`;

export const useBlockUser = (options: MutationOptions = {}) =>
  useMutation(BLOCK_USER, options);
