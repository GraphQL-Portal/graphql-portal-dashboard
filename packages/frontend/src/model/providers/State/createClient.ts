import { ApolloClient, HttpLink, InMemoryCache, split, from, Observable } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';
import { onError } from '@apollo/client/link/error';

import { storeAccessToken, storeRefreshToken } from '../Auth/helpers';
import { URI, wsURI } from './config';
import { promise2Observable } from './promise2Observable';
import { refreshTokens } from './refreshToken';
import { STATUS_401 } from './constants';

type ErrorCallback = Observable<any> | undefined;

let client: ApolloClient<any>;

export const createClient = (token: string) => {
  const headers = Object.assign({}, (token ? { authorization: token } : {}))
  const httpLink = new HttpLink({ uri: URI, headers });
  const wsLink = new WebSocketLink({
    uri: wsURI,
    options: {
      reconnect: true,
    },
  });

  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
    },
    wsLink,
    httpLink
  );

  const errorLink = onError(
    ({ operation, forward, graphQLErrors }): ErrorCallback => {
      if (graphQLErrors) {
        for (let err of graphQLErrors) {
          if (err!.extensions!.code === STATUS_401) {
            return promise2Observable(
              refreshTokens(createClient).then(({ accessToken, refreshToken }) => {
                storeAccessToken(accessToken);
                storeRefreshToken(refreshToken);
                operation.setContext(({ headers = {} }) => ({
                  headers: { ...headers, authorization: accessToken },
                }));
                return forward(operation);
              })
            );
          }
        }
      }
    }
  );

  client = new ApolloClient({
    cache: new InMemoryCache(),
    link: from([errorLink, splitLink]),
  });

  return client;
}
