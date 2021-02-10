import { gql, useMutation } from '@apollo/client';

export const BLOCK_USER = gql`
  mutation blockUser($id: ID!) {
    blockUser(id: $id) {
      _id
    }
  }
`;

export const useBlockUser = (options: any = {}) =>
  useMutation(BLOCK_USER, options);
