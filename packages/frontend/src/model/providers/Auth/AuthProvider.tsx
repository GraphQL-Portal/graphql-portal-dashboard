import React, { useContext, useState, createContext } from 'react';

import {
  getAccessToken,
  getRefreshToken,
  storeAccessToken,
  storeRefreshToken,
  removeAccessToken,
  removeRefreshToken,
} from './helpers';
import { AuthContextShape, Tokens } from './types';

const AuthContext = createContext<null | AuthContextShape>(null);
export const useAuth = () => useContext(AuthContext)!;
const { Provider } = AuthContext;

const ACCESS_TOKEN = getAccessToken() || '';
const REFRESH_TOKEN = getRefreshToken() || '';

export const AuthProvider:React.FC = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string>(ACCESS_TOKEN);
  const [refreshToken, setRefreshToken] = useState<string>(REFRESH_TOKEN);

  const setAuth = ({ accessToken, refreshToken }: Tokens) => {
    // set access token to state and cookie
    setAccessToken(accessToken);
    storeAccessToken(accessToken);

    // set refresh token to state and cookie
    setRefreshToken(refreshToken);
    storeRefreshToken(refreshToken);
  };

  const signOut = () => {
    // remove tokens from cookie
    removeAccessToken();
    removeRefreshToken();

    // remove tokens from state
    setAccessToken('');
    setRefreshToken('');
  }

  return (<Provider value={{ accessToken, refreshToken, setAuth, signOut }}>{children}</Provider>);
};
