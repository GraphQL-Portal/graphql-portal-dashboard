import { gql, useMutation } from '@apollo/client';

export const SIGN_UP = gql`
  mutation register($data: UserInput!) {
    register(data: $data)
  }
`;

export const useSignUp = (options: any) => {
  const [onSignUp] = useMutation(SIGN_UP, options);

  return { onSignUp };
};
