import { ApolloClient, HttpLink, InMemoryCache, split } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';
import { URI, wsURI } from './config';

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

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: splitLink,
  });

  return client;
}
