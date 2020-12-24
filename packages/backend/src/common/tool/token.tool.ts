import HeadersEnum from '../enum/headers.enum';
import jwt from 'jsonwebtoken';
import { config } from 'node-config-ts';
import TokenExpirationTime from '../enum/token-expiration-time.enum';
import { AuthenticationError } from 'apollo-server-express';

export const getTokenFromHeaders = (headers: Headers): string | undefined => {
  return ((headers as any)[HeadersEnum.AUTHORIZATION] || '').split(' ').pop();
}

export const verify = (token: string): { userId: string } => {
  try {
    return jwt.verify(token, config.application.secret) as { userId: string };
  } catch (error) {
    throw new AuthenticationError('Bad JWT token.');
  }
}

export const sign = (userId: string) => {
  return jwt.sign({ userId }, config.application.secret, { expiresIn: TokenExpirationTime.DAY });
}