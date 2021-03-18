import React, { useContext, useState, createContext } from 'react';

import { Role } from '../../../types';
import { getRoleFromToken } from '../../../utils';
import {
  getAccessToken,
  getRefreshToken,
  storeAccessToken,
  storeRefreshToken,
  removeAccessToken,
  removeRefreshToken,
} from './helpers';
import { AuthContextShape, Tokens } from '../../../types';
import { ROLE_GUEST } from './constants';

const AuthContext = createContext<null | AuthContextShape>(null);
export const useAuth = () => useContext(AuthContext)!;
const { Provider } = AuthContext;

const ACCESS_TOKEN = getAccessToken() || '';
const REFRESH_TOKEN = getRefreshToken() || '';
const ROLE: Role = getRoleFromToken(ACCESS_TOKEN);

export const AuthProvider: React.FC = ({ children }) => {
  const [role, setRole] = useState<Role>(ROLE);
  const [accessToken, setAccessToken] = useState<string>(ACCESS_TOKEN);
  const [refreshToken, setRefreshToken] = useState<string>(REFRESH_TOKEN);

  const setAuth = ({ accessToken, refreshToken }: Tokens) => {
    // set access token to state and cookie
    setAccessToken(accessToken);
    storeAccessToken(accessToken);

    // set refresh token to state and cookie
    setRefreshToken(refreshToken);
    storeRefreshToken(refreshToken);
    setRole(getRoleFromToken(accessToken));
  };

  const signOut = () => {
    // remove tokens from cookie
    removeAccessToken();
    removeRefreshToken();

    // remove tokens from state
    setAccessToken('');
    setRefreshToken('');
    setRole(ROLE_GUEST);
  };

  return (
    <Provider value={{ accessToken, role, refreshToken, setAuth, signOut }}>
      {children}
    </Provider>
  );
};
