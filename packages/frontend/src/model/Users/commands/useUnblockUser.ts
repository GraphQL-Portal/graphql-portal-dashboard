import { gql, useMutation } from '@apollo/client';

export const UNBLOCK_USER = gql`
  mutation unblockUser($id: ID!) {
    unblockUser(id: $id) {
      _id
    }
  }
`;

export const useUnblockUser = (options: any = {}) =>
  useMutation(UNBLOCK_USER, options);
