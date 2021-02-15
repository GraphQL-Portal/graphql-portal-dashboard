import { gql, useMutation } from '@apollo/client';

import { MutationOptions } from '../../../types';

export const RERSET_PASSWORD_REQUEST = gql`
  mutation resetPasswordRequest($email: String!) {
    resetPasswordRequest(email: $email)
  }
`;

export const useResetPasswordRequest = (options: MutationOptions = {}) => {
  const [onResetPasswordRequest] = useMutation(
    RERSET_PASSWORD_REQUEST,
    options
  );

  return { onResetPasswordRequest };
};
