import { gql, useMutation } from '@apollo/client';

import { MutationOptions } from '../../../types';

export const CREATE_USER = gql`
  mutation createUser($data: UserInput!) {
    createUser(data: $data)
  }
`;

export const useCreateUser = (options: MutationOptions = {}) =>
  useMutation(CREATE_USER, options);
