import { ApolloClient, HttpLink, InMemoryCache, from } from '@apollo/client';
import { onError } from '@apollo/client/link/error';

import { ErrorCallback } from '../../../types';
import {
  storeAccessToken,
  storeRefreshToken,
  removeAccessToken,
  removeRefreshToken,
} from '../Auth/helpers';
import { URI } from './config';
import { promise2Observable } from './promise2Observable';
import { refreshTokens } from './refreshToken';
import { STATUS_401, REFRESH_LIMIT } from './constants';

let client: ApolloClient<any>;
let refreshCount: number = 0;

export const createClient = (token: string) => {
  const headers = Object.assign({}, token ? { authorization: token } : {});
  const httpLink = new HttpLink({ uri: URI, headers });

  const errorLink = onError(
    ({ operation, forward, graphQLErrors }): ErrorCallback => {
      if (graphQLErrors) {
        for (let err of graphQLErrors) {
          const { extensions = {}, message } = err;
          if (
            extensions.code !== STATUS_401 ||
            /Wrong email or password/.test(message)
          )
            return;

          // We need to increment refreshCount to prevent infinite refreshes
          refreshCount += 1;

          // Sign out if refresh token is invalid or we ask to refresh more than REFRESH_LIMIT
          if (
            message.indexOf('Refresh token is invalid') !== -1 ||
            refreshCount > REFRESH_LIMIT
          ) {
            removeAccessToken();
            removeRefreshToken();
            window.location.href = '/login';
            refreshCount = 0;
            return;
          }

          return promise2Observable(
            refreshTokens(createClient).then(
              ({ accessToken, refreshToken }) => {
                storeAccessToken(accessToken);
                storeRefreshToken(refreshToken);
                operation.setContext(({ headers = {} }) => ({
                  headers: { ...headers, authorization: accessToken },
                }));
                return forward(operation);
              }
            )
          );
        }
      }
    }
  );

  client = new ApolloClient({
    cache: new InMemoryCache(),
    link: from([errorLink, httpLink]),
  });

  return client;
};
