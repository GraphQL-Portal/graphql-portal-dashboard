import { useQuery } from '@apollo/client';
import { QUERY_USERS } from '../../../commands';

export const useUsersQuery = () => {
  const { data, loading, error } = useQuery(QUERY_USERS);

  return {
    data: data?.getUsers || [],
    loading,
    error,
  };
}
