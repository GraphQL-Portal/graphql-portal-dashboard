import React from 'react';
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import { URI } from './config';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({ uri:  URI }),
});

export const StateProvider: React.FC = ({ children }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
