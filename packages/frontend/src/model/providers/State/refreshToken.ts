import { ApolloClient } from "@apollo/client";

import { getRefreshToken } from '../Auth/helpers';
import { UA } from '../Auth/constants';
import { REFRESH_TOKEN } from '../../../commands';


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
