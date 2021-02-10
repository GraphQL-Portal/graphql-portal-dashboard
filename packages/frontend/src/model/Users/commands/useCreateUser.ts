import { gql, useMutation } from '@apollo/client';

export const CREATE_USER = gql`
  mutation createUser($data: UserInput!) {
    createUser(data: $data)
  }
`;

export const useCreateUser = (options: any = {}) =>
  useMutation(CREATE_USER, options);
