import { Roles } from './constants';

export type Tokens = {
  accessToken: string;
  refreshToken: string;
};

export type AuthContextShape = {
  setAuth(data: Tokens): void;
  signOut(): void;
  role: Roles;
} & Tokens;
