import { gql, useMutation } from '@apollo/client';

export const CREATE_USER = gql`
  mutation register($data: UserInput!) {
    register(data: $data)
  }
`;

export const useCreateUser = (options: any = {}) => useMutation(CREATE_USER, options);
