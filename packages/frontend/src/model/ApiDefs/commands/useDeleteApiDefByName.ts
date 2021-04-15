import { useMutation, gql } from '@apollo/client';

import { QUERY_API_DEFS } from '../queries';

const DELETE_API_DEF = gql`
  mutation deleteApiDefByName($name: String!) {
    deleteApiDefByName(name: $name)
  }
`;

export const useDeleteApiDefByName = () => {
  return useMutation(DELETE_API_DEF, {
    refetchQueries: [{ query: QUERY_API_DEFS }],
  });
};
