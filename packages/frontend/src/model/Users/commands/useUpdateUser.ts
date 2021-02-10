import { gql, useMutation } from '@apollo/client';

export const UPDATE_USER = gql`
  mutation updateUser($id: ID!, $data: UpdateUserInput!) {
    updateUser(id: $id, data: $data) {
      _id
    }
  }
`;

export const useUpdateUser = (options: any = {}) =>
  useMutation(UPDATE_USER, options);
