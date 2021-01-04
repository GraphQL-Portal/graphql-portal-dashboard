import { User } from './types';
import { formatString, formatTimestamp } from '../../utils';

export const createUsersList = (data: User[]): string[][] => {
  if (!data) return [];

  return data.reduce((acc: any[], user: User) => {
    acc.push([user.email, user.role, formatString(user.firstName), formatString(user.lastName), formatTimestamp(user.createdAt)]);
    return acc;
  }, []);
};