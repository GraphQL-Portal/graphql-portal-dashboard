import Cookies from 'js-cookie';
import {
  ACCESS_TOKEN_KEY,
  TOKENS_DOMAIN,
  ACCESS_TOKEN_EXPIRES,
  REFRESH_TOKEN_KEY,
  REFRESH_TOKEN_EXPIRES,
} from './constants';

export const getAccessToken = () => Cookies.get(ACCESS_TOKEN_KEY);

export const storeAccessToken = (token: string) =>
  Cookies.set(ACCESS_TOKEN_KEY, token, {
    domain: TOKENS_DOMAIN,
    expires: ACCESS_TOKEN_EXPIRES,
    sameSite: 'Lax',
  });

export const removeAccessToken = () => Cookies.remove(ACCESS_TOKEN_KEY, { domain: TOKENS_DOMAIN });

export const getRefreshToken = () => Cookies.get(REFRESH_TOKEN_KEY);

export const storeRefreshToken = (token: string) =>
  Cookies.set(REFRESH_TOKEN_KEY, token, {
    domain: TOKENS_DOMAIN,
    expires: REFRESH_TOKEN_EXPIRES,
    sameSite: 'Lax',
  });

export const removeRefreshToken = () => Cookies.remove(REFRESH_TOKEN_KEY, { domain: TOKENS_DOMAIN });
