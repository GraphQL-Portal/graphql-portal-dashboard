import React, { useContext, useState, createContext} from 'react';
import { useHistory } from 'react-router-dom';
import { ROUTES } from '../Router';

type Tokens = {
  accessToken: string;
  refreshToken: string;
};

type AuthContextShape = {
  setAuth(data: Tokens): void;
  signOut(): void;
} & Tokens;

const AuthContext = createContext<null | AuthContextShape>(null);
export const useAuth = () => useContext(AuthContext)!;
const { Provider } = AuthContext;

export const AuthProvider:React.FC = ({ children }) => {
  const { push } = useHistory();
  const [accessToken, setAccessToken] = useState<string>('');
  const [refreshToken, setRefreshToken] = useState<string>('');

  const setAuth = ({ accessToken, refreshToken }: Tokens) => {
    if (accessToken) setAccessToken(accessToken);
    if (refreshToken) setRefreshToken(refreshToken);
  };

  const signOut = () => push(ROUTES.LOGIN);

  return (<Provider value={{ accessToken, refreshToken, setAuth, signOut }}>{children}</Provider>);
};
