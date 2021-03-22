import { gql, useQuery } from '@apollo/client';

import { QueryHook, User } from '../../../types';

export const QUERY_PROFILE = gql`
  {
    getProfile {
      _id
      firstName
      lastName
      email
      role
    }
  }
`;

export const useProfile: QueryHook<User> = (options = {}) => {
  const { data, loading, error, refetch } = useQuery(QUERY_PROFILE, options);

  return {
    data: data?.getProfile || {},
    loading,
    error,
    refetch,
  };
};
