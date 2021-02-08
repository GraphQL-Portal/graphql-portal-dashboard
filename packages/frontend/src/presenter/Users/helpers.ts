import { User } from '../../types';
import { formatString, formatTimestamp } from '../../utils';

export const createUsersList = (data: User[]) => {
  if (!data) return [];

  return data.reduce((acc: any[], user: User) => {
    const {
      email,
      _id,
      role,
      firstName,
      lastName,
      createdAt,
      deletedAt,
    } = user;
    acc.push({
      email,
      role,
      id: _id,
      firstName: formatString(firstName),
      lastName: formatString(lastName),
      createdAt: formatTimestamp(createdAt),
      deletedAt,
    });
    return acc;
  }, []);
};
