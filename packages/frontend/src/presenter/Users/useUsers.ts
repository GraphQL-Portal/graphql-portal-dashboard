import { useUsersQuery } from '../../model/Users/queries';
import { createUsersList } from './helpers';

export const useUsers = () => {
  const { data, loading } = useUsersQuery();

  return {
    data: createUsersList(data),
    loading,
  };
};
