import HeadersEnum from '../enum/headers.enum';
import jwt, { SignOptions } from 'jsonwebtoken';
import { config } from 'node-config-ts';
import TokenExpirationTime from '../enum/token-expiration-time.enum';
import { AuthenticationError } from 'apollo-server-express';
import Roles from '../enum/roles.enum';

export const getTokenFromHeaders = (headers: Headers): string | undefined => {
  return ((headers as any)[HeadersEnum.AUTHORIZATION] || '').split(' ').pop();
};

export const verify = (token: string): { userId: string } => {
  try {
    return jwt.verify(token, config.application.jwtSecret) as {
      userId: string;
    };
  } catch (error) {
    throw new AuthenticationError('Bad JWT token.');
  }
};

export const sign = (
  role: Roles,
  userId: string,
  expiresIn: TokenExpirationTime
): string => {
  const options = {} as SignOptions;
  if (expiresIn) {
    options.expiresIn = expiresIn;
  }
  return jwt.sign({ userId }, config.application.jwtSecret, options);
};
