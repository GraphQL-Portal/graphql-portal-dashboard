import { decode } from 'jsonwebtoken';
import { Roles } from '../model/providers/Auth/constants';

export const getRoleFromToken = (token: string): Roles =>
  (decode(token) as any)?.role || Roles.GUEST;
