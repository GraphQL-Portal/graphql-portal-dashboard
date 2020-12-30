import React from 'react';
import {
  ApolloProvider,
} from '@apollo/client';

import { createClient } from './createClient';
import { useAuth } from '../Auth';

export const StateProvider: React.FC = ({ children }) => {
  const { accessToken } = useAuth();
  const client = createClient(accessToken);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
