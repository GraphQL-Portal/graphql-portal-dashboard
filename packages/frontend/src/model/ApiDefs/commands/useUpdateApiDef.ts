import { useMutation, gql } from '@apollo/client';

import { QUERY_API_DEFS } from '../queries';
import { MutationHook } from '../../../types';

const UPDATE_API_DEF = gql`
  mutation updateApiDef(
    $id: ID!
    $apiDef: CreateApiDef!
    $sources: [ID!]!
    $enabled: Boolean
  ) {
    updateApiDef(
      id: $id
      apiDef: $apiDef
      sources: $sources
      enabled: $enabled
    ) {
      apiDef {
        _id
      }
    }
  }
`;

export const useUpdateApiDef: MutationHook<'updateApiDef'> = (options = {}) => {
  const [updateApiDef] = useMutation(UPDATE_API_DEF, {
    refetchQueries: [{ query: QUERY_API_DEFS }],
    ...options,
  });

  return { updateApiDef };
};
