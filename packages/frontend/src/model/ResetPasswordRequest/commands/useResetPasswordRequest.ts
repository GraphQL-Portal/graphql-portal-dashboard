import { gql, useMutation } from '@apollo/client';

export const RERSET_PASSWORD_REQUEST = gql`
  mutation resetPasswordRequest($email: String!) {
    resetPasswordRequest(email: $email)
  }
`;

export const useResetPasswordRequest = (options: any) => {
  const [onResetPasswordRequest] = useMutation(RERSET_PASSWORD_REQUEST, options);

  return { onResetPasswordRequest };
}
