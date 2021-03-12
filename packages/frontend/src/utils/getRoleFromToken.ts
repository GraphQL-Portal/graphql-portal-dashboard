import { decode } from 'jsonwebtoken';
import { Role } from '../types';
import { ROLE_GUEST } from '../model/providers/Auth/constants';

export const getRoleFromToken = (token: string): Role =>
  (decode(token) as any)?.role || ROLE_GUEST;
