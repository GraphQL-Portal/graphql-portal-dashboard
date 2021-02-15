import { gql, useMutation } from '@apollo/client';

import { MutationOptions } from '../../../types';

export const UNBLOCK_USER = gql`
  mutation unblockUser($id: ID!) {
    unblockUser(id: $id) {
      _id
    }
  }
`;

export const useUnblockUser = (options: MutationOptions = {}) =>
  useMutation(UNBLOCK_USER, options);
