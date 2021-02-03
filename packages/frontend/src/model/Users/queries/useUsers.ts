import { gql, useQuery } from '@apollo/client';

export const QUERY_USERS = gql`
  {
    getUsers {
      _id
      firstName
      lastName
      role
      email
      deletedAt
      createdAt
      updatedAt
    }
  }
`;

export const useUsersQuery = (options: any = {}) => {
  const { data, loading, error, refetch } = useQuery(QUERY_USERS, options);

  return {
    data: data?.getUsers || [],
    loading,
    error,
    refetch,
  };
};
