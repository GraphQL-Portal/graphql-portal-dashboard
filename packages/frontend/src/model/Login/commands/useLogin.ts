import { gql, useMutation } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!, $device: String!) {
    login(email: $email, password: $password, device: $device) {
      accessToken
      refreshToken
    }
  }
`;

export const useLogin = (options: any) => {
  const [onLogin] = useMutation(LOGIN, options);

  return { onLogin };
}
