import { gql, useMutation } from '@apollo/client';

import { MutationOptions } from '../../../types';

export const SIGN_UP = gql`
  mutation register($data: UserInput!) {
    register(data: $data)
  }
`;

export const useSignUp = (options: MutationOptions = {}) => {
  const [onSignUp] = useMutation(SIGN_UP, options);

  return { onSignUp };
};
