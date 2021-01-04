import { gql, useQuery } from '@apollo/client';

export const QUERY_USERS = gql`
  {
    getUsers {
      firstName
      lastName
      role
      email
      createdAt
      updatedAt
    }
  }
`;

export const useUsersQuery = () => {
  const { data, loading, error } = useQuery(QUERY_USERS);

  return {
    data: data?.getUsers || [],
    loading,
    error,
  };
}
