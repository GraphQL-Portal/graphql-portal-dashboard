import { useMutation, gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!, $device: String!) {
    login(email: $email, password: $password, device: $device) {
      accessToken
      refreshToken
    }
  }
`;

// export const QUERY_USERS = gql`
//   {
//     getUsers {
//       firstName
//       lastName
//       role
//       email
//       createdAt
//       updatedAt
//     }
//   }
// `;

export const useLogin = (options: any) => {
  const [onLogin] = useMutation(LOGIN, options);

  return { onLogin };
}
