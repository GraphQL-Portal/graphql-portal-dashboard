import { gql, useMutation } from '@apollo/client';

export const RERSET_PASSWORD = gql`
  mutation resetPassword($email: String!, $code: String!, $password: String!) {
    resetPassword(email: $email, code: $code, password: $password)
  }
`;

export const useResetPassword = (options: any) => {
  const [onResetPassword] = useMutation(RERSET_PASSWORD, options);

  return { onResetPassword };
};
