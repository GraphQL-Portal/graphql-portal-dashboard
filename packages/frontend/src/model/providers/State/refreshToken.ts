import { ApolloClient, gql } from "@apollo/client";
import { getRefreshToken } from '../Auth/helpers';
import { UA } from '../Auth/constants';

export const REFRESH_TOKEN = gql`
  mutation RefreshTokens($refreshToken: String!, $device: String!) {
    refreshTokens(refreshToken: $refreshToken, device: $device) {
      accessToken
      refreshToken
    }
  }
`;

export const refreshTokens = async (createClient: (token: string) => ApolloClient<any>): Promise<{
  accessToken: string;
  refreshToken: string;
}> => {
  const client = createClient('');

  const response = await client.mutate({
    mutation: REFRESH_TOKEN,
    variables: {
      refreshToken: getRefreshToken(),
      device: UA,
    },
  });

  return response?.data?.refreshTokens;
};
